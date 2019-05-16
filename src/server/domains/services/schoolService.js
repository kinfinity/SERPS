/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * schoolService: () : SchoolModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *      create | insert
 *          -> createNewEmailUser(email, password)
 *              : checks if user exists first with email [.schoolExists(email)]
 *              : creates new user with email
 *                  and password [_schoolModel.create(email,password)]
 *              : authenticates the user and sends back a token(string),
 *                  message (string), and result(boolean)
 *      remove | delete
 *      findBy | search
 *          -> authenticateUser(email, password)
 *              : searches the database for the user and compares password
 *              : it then takes the email and password from the database
 *              : creates a jwt with the email and password and sends back
 *          ->schoolExists
 *              : checks if an email exists in the database
 *      get    | retrieve
 *             | update
 *
 *
 */

import Password from '../utils/password'
import SchoolModel from '../models/SchoolModel'
import tokenService from '../services/tokenService'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'

const schoolService = {

  // handle for the SchoolModel
  _schoolModel: SchoolModel,
  // Create new user
  async createNewEmailUser(Name,schoolID,email,password,motto,Address,Logo,Images) {

    winstonLogger.info('::schoolService')
    // Holds return data for this fucntion
    let response = null
    // Check if user exists first returns promise resolved to true or false
    await schoolService.schoolExists({email,Name}).
    then((result) => {

      winstonLogger.info('searching DB for school')
      // Email exists in database
        response = result

    }).
    catch((e) => {
      winstonLogger.info('existence error')
      winstonLogger.error(e)
      Promise.resolve(null)
    })
    // Becomes true if user already exists and we kick out of function
    if (response) {

      // Return to higher scope if there's a user
      return Promise.resolve(null)

    }
    // Create static Data for user
      const schoolData = {
        Name,
        schoolID,
        email,
        password,
        motto,
        Address,
        Logo,
        Images
      }
    const ipassword = schoolData.password
    // Hash user password on first save
    await Password.hash(ipassword).
    then((hashedPassword) => {

      // Append Hashed password to static user Data
      schoolData.password = hashedPassword
      // Create new user model
      const school = new SchoolModel(schoolData)
    
      // Save new user
      school.
      save().
      then((result) => {

        // Succeeded in saving new user to DB
        winstonLogger.info(' -> SCHOOL CREATED')
        winstonLogger.info(result)
        result.password =  ipassword
        response = Promise.resolve(result)

      }).
      catch((err) => {

        winstonLogger.error(' -> SCHOOL NOT CREATED')
        winstonLogger.error(err)

        return Promise.resolve(null)

      })

    }).catch((err) => {

      winstonLogger.error('SCHOOL PASSWORD NOT HASHED')
      winstonLogger.error(err)  

      response = Promise.resolve(null)

      return response

    })

    // Create and use timeout
    const timeout = (ms) => new Promise((res) => setTimeout(res, ms))
    await timeout(1000)

    return response

  },
  // Authenticate an already existing user
  async authenticateUser(schoolData) {

    let response = null
    let response1 = null
    let response2 = null
    let tempData = null
    let id = null

    // Try email
    await schoolService.
    _schoolModel.
    findOne({email: schoolData.email}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('email found')
        tempData = Data
        winstonLogger.info(Data)
        response1 = true
        id = schoolData.email

      }

    }).
    catch((err) => {
      
      //
      response1 = false

    })

    // Try Name
    await schoolService.
    _schoolModel.
    findOne({Name: schoolData.Name}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('Name found')
        tempData = Data
        winstonLogger.info(Data)
        response2 = true
        id = schoolData.Name

      }

    }).
    catch((err) => {

      //
      response2 = false

    })

    if (response1 == null && response2 == null) {

      // Break out
      winstonLogger.info(`ERROR AUTHENTICATING :::`)
      // Return false and and empty object
      response = Promise.resolve({
        statusCode: "Sc101",
        Token: null
      })

      return response

    }
    // User exists -> check password correspondence with bcrypt
    let res = null
  
    await Password.compare(schoolData.password, tempData.password).
    then((matched) => {
    
      // Password matched
      winstonLogger.info(`password matched ? ${matched}`)
      res = Promise.resolve(matched)

    }).
    catch((err) => Promise.reject(err))

    if (!res) {

      response = {
        statusCode: "SC101",
        Token: null
      }

      return response

    }
    
    let Token = null
    // Return a boolean(true) and signed JWT
    await Promise.resolve(tokenService.generateToken({
          email: tempData.email,
          Name: tempData.Name
    })).
    then((tk) => {

      winstonLogger.info('Generated Token')
      winstonLogger.info(tk)
      Token = tk

    }).
    catch((e) => {
      
      winstonLogger.error('error generating token')
      winstonLogger.error(e)

    })

    winstonLogger.info('TOKEN')
    winstonLogger.info(JSON.stringify(Token))

    // Resolve
    response = Promise.resolve({
      statusCode: "sc100",
      Token
    })

    return response

  },

  /*
   * Checks if the user is in the Database without returning anyData
   * returns a boolean based on availability
   */
  async schoolExists(schoolE) {

    let eeResult = null
    let eeResult1 = null
    let eeResult2 = null

    // Check email
    await schoolService.
    _schoolModel.
    findOne({email: schoolE.email}).
    then((Data) => {

      winstonLogger.info(`checking data base for school with email `)
      if(Data){
  
        if (Data.length === 0) {

          winstonLogger.info('no school with email exists')
          eeResult1 = Promise.resolve(false)

        }

        winstonLogger.info(`FOUND: ${Data}`)
        eeResult1 = Promise.resolve(true)
      }

    }).
    catch((err) => {

      winstonLogger.info('error checking database')
      winstonLogger.info(err)
      eeResult1 = Promise.resolve(false)

    })
    // Check Name
    await schoolService.
    _schoolModel.
    findOne({Name: schoolE.Name}).
    then((Data) => {

      winstonLogger.info(`checking data base for school Name`)
      if(Data) {

        if (Data.length === 0) {

          winstonLogger.info('no school exists with Name ')
          eeResult2 = Promise.resolve(false)

        }

        winstonLogger.info(`FOUND: ${Data}`)
        eeResult2 = Promise.resolve(true)
      }
    }).
    catch((err) => {

      winstonLogger.info('error checking database')
      winstonLogger.info(err)
      eeResult2 = Promise.resolve(false)

    })

    return eeResult = eeResult1 || eeResult2

  },

  /*
   * Init reset send mail ( verification code | reset token)
   * update passresetkey & keyexpiration in schema
   * return result message (boolean)
   */
  async initPasswordReset(schoolE) {

    // Email exists result
    let response0 = null

    // Ensure email exists in database
    await schoolService.schoolExists(schoolE).
    then((result) => {

      // Boolean result
      response0 = result

    }).
    catch((err) => winstonLogger.info(err))
    // If no return failure if yes continue
    if (!response0) {

      winstonLogger.info(`${user} does not belongs to a user in database`)

      return Promise.reject(response0)

    }
    // Initialize and get resetDetails
      const verificationPack = await Password.initReset(email)
      .then((verPack) => {

          Promise.resolve(verPack)

      })
      .catch((err) => {

          Promise.reject(err)

      })

    // Add email to verificationPack
      winstonLogger.info('this is the RESET data')
    winstonLogger.info(verificationPack)
      verificationPack.email = email

    // Add temporaryData(verificationPack) to user's data in DB
    await schoolService
      ._schoolModel.update(verificationPack)
      .then((response) => {

        winstonLogger.info('updated: ')
          winstonLogger.info(response)

      })
      .catch((err) => {

          winstonLogger.info('error updating the user data with reset data ')
          winstonLogger.info(err)
        // Return false and and empty object

          Promise.reject(err)

      })

    // Return value
    return Promise.resolve()

  },

  /*
   * Validates verification code and resets the password
   */
    async validatePasswordResetEmail(email, verificationCode, newPassword) {

      winstonLogger.info('ENTERED VALIDATEPASSWORDRESETEMAIL FUNCTION')
    // Find email and verificationCode combination
    await schoolService._schoolModel.findOne({
            email,
      verificationCode,
        })
      .then((schoolData) => {

        winstonLogger.info('schoolData : ')
        winstonLogger.info(schoolData)
        // Update passwordfied
          schoolData.password = newPassword
        // Delete the temporaryData
        schoolData.verificationCode = null
        schoolData.verificationCodeExpiration = null
        winstonLogger.info('new schoolData : ')
        schoolData.save()
          .catch((err) => {

              winstonLogger.info('error updating password')
              winstonLogger.info(err)

          })
        winstonLogger.info(schoolData)


      })
      .catch((err) => {

          winstonLogger.info('ERROR updating PASSWORD')

        return Promise.reject(err)

      })

  },

  /*
   * Uses validated resetToken to reset the password
   */
    async validatePasswordResetToken(resetToken, newPassword) {

      winstonLogger.info('ENTERED VALIDATEPASSWORDRESETTOKEN FUNCTION')
    // Find email and verificationCode combination
      await schoolService._schoolModel.findOne(resetToken)
      .then((schoolData) => {

        winstonLogger.info('schoolData : ')
          winstonLogger.info(schoolData)
        // Update passwordfied
          schoolData.password = newPassword
        // Delete the temporaryData
          schoolData.verificationCode = null
          schoolData.verificationCodeExpiration = null

      })
      .catch((err) => {

          winstonLogger.info('ERROR updating PASSWORD')

          return Promise.reject(err)

      })

  },

  /*
   * Destroy the Token object from DB so authorisation would fail for all requests
   */
    async logoutUser(Token) {

    // Destroy the token from database
    winstonLogger.info('destroy token')
    await Promise.resolve(tokenService.killToken(Token))

  },

  /**
   *  school info manipulation functions 
   */
    async getSchoolInfo(schoolName,schoolID){

      await schoolService._schoolModel.
      findOne({
        Name: schoolName,
        schoolID: schoolID
      }).then((schoolData) => {

        return Promise.resolve(schoolData)
        
      }).catch((e) => {

        winstonLogger.info('error getting school Data')
        return Promise.reject(e)

      })

    }

}

export default schoolService