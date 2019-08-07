/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * teacherService: () : TeacherModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *      create | insert
 *          -> createNewEmailUser(email, password)
 *              : checks if user exists first with email [.teacherExists(email)]
 *              : creates new user with email
 *                  and password [_teacherModel.create(email,password)]
 *              : authenticates the user and sends back a token(string),
 *                  message (string), and result(boolean)
 *      remove | delete
 *      findBy | search
 *          -> authenticateUser(email, password)
 *              : searches the database for the user and compares password
 *              : it then takes the email and password from the database
 *              : creates a jwt with the email and password and sends back
 *          ->teacherExists
 *              : checks if an email exists in the database
 *      get    | retrieve
 *             | update
 *
 *
 */

import Password from '../utils/password'
import TeacherModel from '../models/teacherModel'
import tokenService from './tokenService'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import shortid from 'short-id'
import publicEnums from '../../app/publicEnums'

const teacherService = {

  // handle for the TeacherModel
  _teacherModel: TeacherModel,
  // Create new user
  async createNewEmailUser(schoolName,Name,birthDate,email,password,gender,Address){

    winstonLogger.info('inside teacherService')
    // Holds return data for this fucntion
    let response = null
    const fullName = Name.first + " " + Name.middle + " " + Name.last
    winstonLogger.info('Name:')
    winstonLogger.info(fullName)
    // Check if user exists first returns promise resolved to true or false
    await teacherService.teacherExists({email,fullName}).
    then((result) => {

      winstonLogger.info('searching DB teacher')
      winstonLogger.info(JSON.stringify(result,null,4))
      // Email exists in database
        response = result

    }).
    catch((e) => {
      winstonLogger.info('ERROR: checking DB for teacher')
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
    
    // create temp teacherID
    const teacherID = Name.first + shortid.generate() 
    winstonLogger.info('Generated ID:')
    winstonLogger.info(teacherID)

    // Create static Data for user
      let teacherData = {
        schoolName,
        teacherID,
        fullName,
        email,
        gender,
        birthDate,
        Address
      }
    const ipassword = password

    winstonLogger.info('HERE:')
    winstonLogger.info(JSON.stringify(teacherData,null,4))
    // Hash user password on first save
    await Password.hash(ipassword).
    then((hashedPassword) => {

      // Append Hashed password to static user Data
      winstonLogger.info('HASHED:')
      winstonLogger.info(hashedPassword)
      teacherData.password = hashedPassword

    }).catch((err) => {

      winstonLogger.error('STUDENT PASSWORD NOT HASHED')
      winstonLogger.error(err.stack)  

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    })

    // Create new user model
    const teacher = new TeacherModel(teacherData)
    
    // Save new user
    await teacher.
    save().
    then((result) => {

      // Succeeded in saving new user to DB
      winstonLogger.info(' -> teacher CREATED')
      winstonLogger.info(JSON.stringify(result,null,4))
      result.password =  ipassword

      response = result

    }).
    catch((err) => {

      winstonLogger.error(' -> teacher NOT CREATED')
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
  async authenticateUser(teacherData) {

    winstonLogger.info('teacher service')
    winstonLogger.info(JSON.stringify(teacherData,null,4))

    let response = null
    let response1 = null
    let response2 = null
    let tempData = null
    let id = null

    // Try email
    await teacherService._teacherModel.
    findOne({email: teacherData.detail}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('Email found:')
        tempData = Data
        winstonLogger.info(JSON.stringify(Data.email,null,4))
        response1 = true
        id = teacherData.detail

      }

    }).
    catch((err) => {
      
      //
      response1 = false

    })

    // Try Name
    await teacherService._teacherModel.
    findOne({studentID: teacherData.detail}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('schoolID found:')
        tempData = Data
        winstonLogger.info(Data.schoolID)
        response2 = true
        id = teacherData.detail

      }

    }).
    catch((err) => {

      //
      winstonLogger.error('ERROR: searching for name')
      winstonLogger.error(err.stack)
      response2 = false

    })

    if (!(response1 || response2)){

      // Break out
      winstonLogger.info(`ERROR AUTHENTICATING :::`)
      // Return false and and empty object
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Token: null
      })

    }
    // User exists -> check password correspondence with bcrypt
    let res = null
  
    await Password.compare(teacherData.password, tempData.password).
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
      schoolName: tempData.schoolName,
      schoolID: tempData.schoolID,
      teacherName: tempData.fullName,
      teacherID: tempData.teacherID
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
  async teacherExists(teacherE) {

      let result = null
  
      // Check email
      await teacherService.
      _teacherModel.
      findOne({
        email: teacherE.email,
        fullName: teacherE.fullName
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
  
        winstonLogger.error('ERROR: checking database for teacher')
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
  async initPasswordReset(teacherE) {

    // Email exists result
    let response0 = null

    // Ensure email exists in database
    await teacherService.teacherExists(teacherE).
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
    await teacherService
      ._teacherModel.update(verificationPack)
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
    await teacherService._teacherModel.findOne({
            email,
      verificationCode,
        })
      .then((teacherData) => {

        winstonLogger.info('teacherData : ')
        winstonLogger.info(teacherData)
        // Update passwordfied
          teacherData.password = newPassword
        // Delete the temporaryData
        teacherData.verificationCode = null
        teacherData.verificationCodeExpiration = null
        winstonLogger.info('new teacherData : ')
        teacherData.save()
          .catch((err) => {

              winstonLogger.error('Error updating password')
              winstonLogger.info(err)

          })
        winstonLogger.info(teacherData)


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
      await teacherService._teacherModel.findOne(resetToken)
      .then((teacherData) => {

        winstonLogger.info('teacherData : ')
          winstonLogger.info(teacherData)
        // Update passwordfied
          teacherData.password = newPassword
        // Delete the temporaryData
          teacherData.verificationCode = null
          teacherData.verificationCodeExpiration = null

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


  async getTeacherInfo(schoolName,schoolID,teacherName,teacherID){

    let teacherInfo = null

    winstonLogger.info('DETAILS')
    winstonLogger.info(teacherName)
    winstonLogger.info(teacherID)
    await teacherService._teacherModel.
      findOne({
        schoolName,
        schoolID,
        // fullname: teacherName,
        teacherID
      }).
      then((teacherData) => {

        winstonLogger.info('GET: teacher info')
        winstonLogger.info(JSON.stringify(teacherData,null,4))

        if(teacherData){
          teacherInfo = {
            Name: teacherData.fullName,
            // Address: teacherData.Address,
            // Email: teacherData.email,
            Gender: teacherData.gender
          }
        }
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting teacher info')
        winstonLogger.error(e.stack)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
      
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: teacherInfo
      })

  },
  async getTeacherContactInfo(schoolName,schoolID,teacherName,teacherID){

    let teacherInfo = null

    winstonLogger.info('DETAILS')
    winstonLogger.info(teacherName)
    winstonLogger.info(teacherID)
    await teacherService._teacherModel.
      findOne({
        schoolName,
        schoolID,
        // fullname: teacherName,
        teacherID
      }).
      then((teacherData) => {

        winstonLogger.info('GET: teacher Contact info')
        winstonLogger.info(JSON.stringify(teacherData,null,4))

        if(teacherData){
          teacherInfo = {
            Name: teacherData.fullName,
            Address: teacherData.Address,
            Email: teacherData.email
          }
        }
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting teacher Contact info')
        winstonLogger.error(e.stack)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
      
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: teacherInfo
      })

  },
  async updateTeacherContactInfo(schoolName,schoolID,teacherName,teacherID,contactInfo){

    let teacherInfo = null

    const options = {
      new: true,
      safe: true,
      upsert: true
    }

    winstonLogger.info('DETAILS')
    winstonLogger.info(teacherName)
    winstonLogger.info(teacherID)
    winstonLogger.info(JSON.stringify(contactInfo,null,4))

    await teacherService._teacherModel.
      findOneAndUpdate({
        schoolName,
        schoolID,
        // fullname: teacherName,
        teacherID
        },
        contactInfo,
        options
      ).
      then((teacherData) => {

        winstonLogger.info('GET: teacher Contact info')
        winstonLogger.info(JSON.stringify(teacherData,null,4))

        if(teacherData){
          teacherInfo = teacherData
        }
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting teacher Contact info')
        winstonLogger.error(e.stack)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
      
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: teacherInfo
      })

  },

  //
  async assignClassIDtoTeacher(classAlias,classID,teacherRef){

    //
    let response = null

    const options = {
      new: true,
      safe: true,
      upsert: true
    }

    teacherService._teacherModel.
    findOneAndUpdate({
        _id: teacherRef
      },{
        class: {
          Alias: classAlias,
          classRef: classID
        }
      },
      options
    ).
    then((res) => {

      winstonLogger.info('UPDATE: classID to teacher document')
      winstonLogger.info(JSON.stringify(res,null,4))
      // check if update worked

    }).
    catch((e) => {

      winstonLogger.error('ERROR: adding classID to teacher document')
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    })

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: true
    })

  },

  async updateActivityTeacher(activityAlias, activityID, teacherRef, oldteacherRef){

    let response = null

    const options = {
      new: true,
      safe: true,
      upsert: true
    }

    if(oldteacherRef){

      await teacherService._teacherModel.
      findOneAndRemove({
          _id: oldteacherRef
        },{
          activity: {
            Name: activityAlias,
            activityRef: activityID 
          }
        },
        options
      ).
      then((res) => {

        winstonLogger.info('UPDATE: activityID from teacher document')
        winstonLogger.info(JSON.stringify(res,null,4))
        // check if update worked

      }).
      catch((e) => {
        winstonLogger.error('ERROR: removing activity from teacher document')
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: false
        })
      })

    }

    await teacherService._teacherModel.
    findOneAndUpdate({
        _id: teacherRef
      },{
        activity: {
          Name: activityAlias,
          activityRef: activityID
        }
      },
      options
    ).
    then((res) => {

      winstonLogger.info('UPDATE: activityID to teacher document')
      winstonLogger.info(JSON.stringify(res,null,4))
      // check if update worked

    }).
    catch((e) => {

      winstonLogger.error('ERROR: adding activityID to teacher document')
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    })

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: true
    })

  }

}

export default teacherService