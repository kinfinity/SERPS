/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * parentService: () : ParentModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *      create | insert
 *          -> createNewEmailUser(email, password)
 *              : checks if user exists first with email [.parentExists(email)]
 *              : creates new user with email
 *                  and password [_parentModel.create(email,password)]
 *              : authenticates the user and sends back a token(string),
 *                  message (string), and result(boolean)
 *      remove | delete
 *      findBy | search
 *          -> authenticateUser(email, password)
 *              : searches the database for the user and compares password
 *              : it then takes the email and password from the database
 *              : creates a jwt with the email and password and sends back
 *          ->parentExists
 *              : checks if an email exists in the database
 *      get    | retrieve
 *             | update
 *
 *
 */

import Password from '../utils/password'
import ParentModel from '../models/ParentModel'
import tokenService from './tokenService'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'
import shortid from 'short-id'
import studentService from './studentService'

const parentService = {

  // handle for the ParentModel
  _parentModel: ParentModel,
  // Create new user
  async createNewEmailUser(schoolName,Name,birthDate,email,password,gender,Address){

    winstonLogger.info('inside studentService')
    // Holds return data for this fucntion
    let response = null
    const fullName = Name.first + " " + Name.middle + " " + Name.last
    winstonLogger.info('Name:')
    winstonLogger.info(fullName)
    // Check if user exists first returns promise resolved to true or false
    await parentService.parentExists({email,fullName}).
    then((result) => {

      winstonLogger.info('searching DB parent')
      winstonLogger.info(JSON.stringify(result,null,4))
      // Email exists in database
        response = result

    }).
    catch((e) => {
      winstonLogger.info('ERROR: checking DB for parent')
      winstonLogger.error(e.stack)

      Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    })
    // Becomes true if user already exists and we kick out of function
    if (response) {

      winstonLogger.info('wrong response')

      // Return to higher scope if there's a user
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR_USEREXISTS,
        Data: null
      })

    }
    winstonLogger.info('SCHOOL NAME:')
    winstonLogger.info(JSON.stringify(schoolName,null,4))
    
    // create temp parentID
    const parentID = Name.first + shortid.generate() 
    winstonLogger.info('Generated ID:')
    winstonLogger.info(parentID)

    // Create static Data for user
      let parentData = {
        schoolName,
        parentID,
        fullName,
        email,
        gender,
        birthDate,
        Address
      }
    const ipassword = password

    winstonLogger.info('HERE:')
    winstonLogger.info(JSON.stringify(parentData,null,4))
    // Hash user password on first save
    await Password.hash(ipassword).
    then((hashedPassword) => {

      // Append Hashed password to static user Data
      winstonLogger.info('HASHED:')
      winstonLogger.info(hashedPassword)
      parentData.password = hashedPassword

    }).catch((err) => {

      winstonLogger.error('STUDENT PASSWORD NOT HASHED')
      winstonLogger.error(err)  

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    })

    // Create new user model
    const parent = new ParentModel(parentData)
    
    // Save new user
    await parent.
    save().
    then((result) => {

      // Succeeded in saving new user to DB
      winstonLogger.info(' -> PARENT CREATED')
      winstonLogger.info(JSON.stringify(result,null,4))
      result.password =  ipassword

      response = result

    }).
    catch((err) => {

      winstonLogger.error(' -> PARENT NOT CREATED')
      winstonLogger.error(err.stack)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    })
    // Create and use timeout
    const timeout = (ms) => new Promise((res) => setTimeout(res, ms))
    await timeout(1000)

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
      Data: response
    })

  },
  // Authenticate an already existing user
  async authenticateUser(parentData) {

    winstonLogger.info('student service')
    winstonLogger.info(JSON.stringify(parentData,null,4))

    let response = null, tempData = null, id = null

    // Try email
    await parentService.
    _parentModel.
    findOne({email: parentData.email}).
    then((Data) => {

      winstonLogger.info('searching for email')
      winstonLogger.info(JSON.stringify(Data,null,4))
      // Get data from DB
      if(Data) {
        winstonLogger.info('email found')
        winstonLogger.info(JSON.stringify(Data,null,4))
        tempData = Data
        id = parentData.email
        response = true
      }

    }).
    catch((err) => {
      
      winstonLogger.error('ERROR: searching for email')
      winstonLogger.error(err.stack)
      //
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    })


    if (!response) {

      winstonLogger.info('email does not exists')

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    }
    // User exists -> check password correspondence with bcrypt
    let res = null
  
    await Password.compare(parentData.password, tempData.password).
    then((matched) => {
    
      // Password matched
      winstonLogger.info(`password matched ? ${matched}`)
      res = Promise.resolve(matched)

    }).
    catch((err) => Promise.reject(err))

    if (!res) {

      return {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Token: null
      }

    }

    winstonLogger.info('TEMP DATA:')
    winstonLogger.info(JSON.stringify(tempData,null,4))
    // Return a boolean(true) and signed JWT
    const Token = await Promise.resolve(tokenService.generateToken({
          parentID: tempData.parentID,
          fullName: tempData.fullName
    }))

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Token
    })

  },

  /*
   * Checks if the user is in the Database without returning anyData
   * returns a boolean based on availability
   */
  async parentExists(parentE) {

      let result = null
  
      // Check email
      await parentService.
      _parentModel.
      findOne({
        email: parentE.email,
        fullName: parentE.fullName
      }).
      then((Data) => {
  
        winstonLogger.info(`checking data base for user`)
        if(Data){
  
          winstonLogger.info(`FOUND:  ${JSON.stringify(Data,null,4)}`)
          result = Promise.resolve(true)
        }else {
          winstonLogger.info('user does not exists')
          result = Promise.resolve(false)
        }
  
      }).
      catch((e) => {
  
        winstonLogger.error('ERROR: checking database for parent')
        winstonLogger.error(e.stack)
  
        result = Promise.resolve(false)
  
      })
  
      return result
  
    },

  /*
   * Init reset send mail ( verification code | reset token)
   * update passresetkey & keyexpiration in schema
   * return result message (boolean)
   */
  async initPasswordReset(parentE) {

    // Email exists result
    let response0 = null

    // Ensure email exists in database
    await parentService.parentExists(parentE).
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
    await parentService
      ._parentModel.update(verificationPack)
      .then((response) => {

        winstonLogger.info('updated: ')
          winstonLogger.info(response)

      })
      .catch((err) => {

          winstonLogger.error('Error updating the user data with reset data ')
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

      winstonLogger.error('ENTERED VALIDATEPASSWORDRESETEMAIL FUNCTION')
    // Find email and verificationCode combination
    await parentService._parentModel.findOne({
            email,
      verificationCode,
        })
      .then((parentData) => {

        winstonLogger.info('parentData : ')
        winstonLogger.info(parentData)
        // Update passwordfied
          parentData.password = newPassword
        // Delete the temporaryData
        parentData.verificationCode = null
        parentData.verificationCodeExpiration = null
        winstonLogger.info('new parentData : ')
        parentData.save()
          .catch((err) => {

              winstonLogger.error('Error updating password')
              winstonLogger.info(err)

          })
        winstonLogger.info(parentData)


      })
      .catch((err) => {

          winstonLogger.error('ERROR updating PASSWORD')

        return Promise.reject(err)

      })

  },

  /*
   * Uses validated resetToken to reset the password
   */
    async validatePasswordResetToken(resetToken, newPassword) {

      winstonLogger.error('ENTERED VALIDATEPASSWORDRESETTOKEN FUNCTION')
    // Find email and verificationCode combination
      await parentService._parentModel.findOne(resetToken)
      .then((parentData) => {

        winstonLogger.info('parentData : ')
          winstonLogger.info(parentData)
        // Update passwordfied
          parentData.password = newPassword
        // Delete the temporaryData
          parentData.verificationCode = null
          parentData.verificationCodeExpiration = null

      })
      .catch((err) => {

          winstonLogger.error('ERROR updating PASSWORD')

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

  async getPersonalInfoByID(parentID){

    let parentInfo = null

    await parentService._parentModel.
      findOne({
        _id: parentID
      }).
      then((parentData) => {

        winstonLogger.info('GET: parent info')
        winstonLogger.info(JSON.stringify(parentData,null,4))

        if(parentData){
          parentInfo = {
            Name: parentData.fullName,
            Address: parentData.Address,
            Email: parentData.email,
            Gender: parentData.gender
          }
        }
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting parent info')
        winstonLogger.error(e.messsage)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
      
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: parentInfo
      })

  },

  async getParentInfo(parentName,parentID){

    let parentInfo = null

    winstonLogger.info('DETAILS')
    winstonLogger.info(parentName)
    winstonLogger.info(parentID)
    await parentService._parentModel.
      findOne({
        // fullname: parentName,
        parentID
      }).
      then((parentData) => {

        winstonLogger.info('GET: parent info')
        winstonLogger.info(JSON.stringify(parentData,null,4))

        if(parentData){
          parentInfo = {
            Name: parentData.fullName,
            // Address: parentData.Address,
            // Email: parentData.email,
            Gender: parentData.gender
          }
        }
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting parent info')
        winstonLogger.error(e.stack)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
      
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: parentInfo
      })

  },

  async getParentContactInfo(parentName,parentID){

    let parentInfo = null

    winstonLogger.info('DETAILS')
    winstonLogger.info(parentName)
    winstonLogger.info(parentID)
    await parentService._parentModel.
      findOne({
        // fullname: parentName,
        parentID
      }).
      then((parentData) => {

        winstonLogger.info('GET: parent Contact info')
        winstonLogger.info(JSON.stringify(parentData,null,4))

        if(parentData){
          parentInfo = {
            Name: parentData.fullName,
            Address: parentData.Address,
            Email: parentData.email
          }
        }
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting parent Contact info')
        winstonLogger.error(e.stack)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
      
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: parentInfo
      })

  },
  async updateParentContactInfo(parentName,parentID,contactInfo){

    let parentInfo = null

    const options = {
      new: true,
      safe: true,
      upsert: true
    }

    winstonLogger.info('DETAILS')
    winstonLogger.info(parentName)
    winstonLogger.info(parentID)
    winstonLogger.info(JSON.stringify(contactInfo,null,4))

    await parentService._parentModel.
      findOneAndUpdate({
        // fullname: parentName,
        parentID
        },
        contactInfo,
        options
      ).
      then((parentData) => {

        winstonLogger.info('GET: parent Contact info')
        winstonLogger.info(JSON.stringify(parentData,null,4))

        if(parentData){
          parentInfo = parentData
        }
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting parent Contact info')
        winstonLogger.error(e.stack)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
      
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: parentInfo
      })

  },    
  async getChildrenInfo(parentName,parentID){

    let childInfo = null

    winstonLogger.info('DETAILS')
    winstonLogger.info(parentName)
    winstonLogger.info(parentID)
    
    await parentService._parentModel.
      findOne({
        // fullname: parentName,
        parentID
      }).
      then((parentData) => {

        winstonLogger.info('GET: parent Contact info')
        winstonLogger.info(JSON.stringify(parentData,null,4))

        if(parentData.children){
          childInfo = parentData.children
        }
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting parent Contact info')
        winstonLogger.error(e.stack)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
     
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: childInfo
      })

  },



}

export default parentService