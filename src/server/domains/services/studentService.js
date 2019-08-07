/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * studentService: () : studentModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *      create | insert
 *          -> createNewEmailUser(email, password)
 *              : checks if user exists first with email [.studentExists(email)]
 *              : creates new user with email
 *                  and password [_studentModel.create(email,password)]
 *              : authenticates the user and sends back a token(string),
 *                  message (string), and result(boolean)
 *      remove | delete
 *      findBy | search
 *          -> authenticateUser(email, password)
 *              : searches the database for the user and compares password
 *              : it then takes the email and password from the database
 *              : creates a jwt with the email and password and sends back
 *          ->studentExists
 *              : checks if an email exists in the database
 *      get    | retrieve
 *             | update
 *
 *
 */

import Password from '../utils/password'
import StudentModel from '../models/studentModel'
import tokenService from './tokenService'
import publicEnums from '../../app/publicEnums'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import SchoolModel from '../models/schoolModel'
import shortid from 'short-id'


shortid.configure({
  length: 3,          // The length of the id strings to generate
  algorithm: 'sha1',  // The hashing algoritm to use in generating keys
  salt: Math.random   // A salt value or function
})


const studentService = {

  // handle for the StudentModel
  _studentModel: StudentModel,
  _schoolModel: SchoolModel,
  // Create new user
  async createNewEmailUser(schoolName,publicIdentifier,Name,gender,birthDate,email,password,classAlias) {

    winstonLogger.info('inside studentService')
    // Holds return data for this fucntion
    let response = null
    const fullName = Name.first + " "+ Name.middle + " " +Name.last 
    // Check if user exists first returns promise resolved to true or false
    await studentService.studentExists({email,fullName}).
    then((result) => {

      winstonLogger.info('searching DB for student')
      winstonLogger.info(JSON.stringify(result,null,4))
      // Email exists in database
        response = result

    }).
    catch((e) => {
      winstonLogger.info('ERROR: checking DB for student')
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
    winstonLogger.info(JSON.stringify(publicIdentifier,null,4))
    // get school publicIdentifier
    let schoolPI = null, schoolRef = null, schoolID = null
    await studentService._schoolModel.
     findOne({
       Name: schoolName
     }).
    then((schoolData) => {
       if(schoolData){
          winstonLogger.info('GET: school public_ACCESS_CODE')
          winstonLogger.info(JSON.stringify(schoolData,null,4))
          schoolPI = schoolData.public_ACCESS_CODE
          schoolRef = schoolData._id
          schoolID = schoolData.schoolID
       }else{
         winstonLogger.info('school not found')
       }
     }).
     catch((e) => {
       winstonLogger.error('ERROR: getting school public_ACCESS_CODE')
       winstonLogger.error(e.stack)

       return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

     })
    // verify school publicIdentifier
    let match = null
    await Password.compare(publicIdentifier,schoolPI).
    then((matched) => {
    
      // Password matched
      winstonLogger.info(`school code matched ? ${matched}`)
      match = Promise.resolve(matched)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: trying to match school public_ACCESS_CODE')
      winstonLogger.error(e.stack)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR_SCHOOLCODEMISMATCH,
        Data: null
      })

    })
    if(!match && !publicEnums.CLASS_LIST.match(classAlias)){

      winstonLogger.info('invalid MATCH')
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR_SCHOOLCODEMISMATCH,
        Data: null
      })

    }
    

    // create temp StudentID
    const studentID = schoolID + Name.first + shortid.generate() 
    winstonLogger.info('Generated ID:')
    winstonLogger.info(studentID)

    // Create static Data for user
      let studentData = {
        schoolName,
        schoolRef,
        studentID,
        fullName,
        email,
        classAlias,
        gender,
        birthDate
      }
    const ipassword = password

    winstonLogger.info('HERE:')
    winstonLogger.info(JSON.stringify(studentData,null,4))
    // Hash user password on first save
    await Password.hash(ipassword).
    then((hashedPassword) => {

      // Append Hashed password to static user Data
      winstonLogger.info('HASHED:')
      winstonLogger.info(hashedPassword)
      studentData.password = hashedPassword

    }).catch((err) => {

      winstonLogger.error('STUDENT PASSWORD NOT HASHED')
      winstonLogger.error(err)  

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    })

    // Create new user model
    const student = new StudentModel(studentData)
    
    // Save new user
    await student.
    save().
    then((result) => {

      // Succeeded in saving new user to DB
      winstonLogger.info(' -> STUDENT CREATED')
      winstonLogger.info(JSON.stringify(result,null,4))
      result.password =  ipassword

      response = result

    }).
    catch((err) => {

      winstonLogger.error(' -> STUDENT NOT CREATED')
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
  async authenticateUser(studentData) {

    winstonLogger.info('student service')
    winstonLogger.info(JSON.stringify(studentData,null,4))

    let response = null
    let response1 = null
    let response2 = null
    let tempData = null
    let id = null

    // Try email
    await studentService._studentModel.
    findOne({email: studentData.detail}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('Email found:')
        tempData = Data
        winstonLogger.info(JSON.stringify(Data.email,null,4))
        response1 = true
        id = studentData.detail

      }

    }).
    catch((err) => {
      
      //
      response1 = false

    })

    // Try Name
    await studentService._studentModel.
    findOne({studentID: studentData.detail}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('schoolID found:')
        tempData = Data
        winstonLogger.info(Data.schoolID)
        response2 = true
        id = studentData.detail

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
  
    await Password.compare(studentData.password, tempData.password).
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
          studentID: tempData.studentID,
          fullName: tempData.fullName,  
          schoolName: tempData.schoolName
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
  async studentExists(studentE) {

    let result = null

    // Check email
    await studentService.
    _studentModel.
    findOne({
      email: studentE.email,
      fullName: studentE.fullName
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

      winstonLogger.error('ERROR: checking database for student')
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
  async initPasswordReset(studentE) {

    // Email exists result
    let response0 = null

    // Ensure email exists in database
    await studentService.studentExists(studentE).
    then((result) => {

      // Boolean result
      response0 = result

    }).
    catch((err) => winstonLogger.info(err))
    // If no return failure if yes continue
    if (!response0) {

      winstonLogger.info(`${user} does not belongs to a user in database`)

      return Promise.resolve(response0)

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
    await studentService
      ._studentModel.update(verificationPack)
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
    await studentService._studentModel.findOne({
            email,
      verificationCode,
        })
      .then((studentData) => {

        winstonLogger.info('studentData : ')
        winstonLogger.info(studentData)
        // Update passwordfied
          studentData.password = newPassword
        // Delete the temporaryData
        studentData.verificationCode = null
        studentData.verificationCodeExpiration = null
        winstonLogger.info('new studentData : ')
        studentData.save()
          .catch((err) => {

              winstonLogger.info('error updating password')
              winstonLogger.info(err)

          })
        winstonLogger.info(studentData)


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
      await studentService._studentModel.findOne(resetToken)
      .then((studentData) => {

        winstonLogger.info('studentData : ')
          winstonLogger.info(studentData)
        // Update passwordfied
          studentData.password = newPassword
        // Delete the temporaryData
          studentData.verificationCode = null
          studentData.verificationCodeExpiration = null

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
  async getStudentPersonalInfo(schoolName,fullName,studentID){

     let profileInfo = null

      await studentService._studentModel.
      findOne({
        fullName,
        studentID,
        schoolName
      }).
      then((studentData) => {

        // pack in only the school's basic profile info
        if(studentData){
          profileInfo = {
            Name: studentData.fullName,
            email: studentData.email,
            address: studentData.address,
            schoolName: studentData.schoolName,
            studentID: studentData.studentID,
            admissionStatus: studentData.admission_Status
          }
        }
        winstonLogger.info('GET: student profileInfo')
        winstonLogger.info(JSON.stringify(profileInfo,null,4))
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting student data')
        winstonLogger.error(e.stack)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
      
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: profileInfo
      })

  },
  async updateStudent(schoolName,schoolID,studentName,studentID,studentData){

    //
    const options = {
      new: true,
      upsert: true,
      safe: true
    }

      await studentService._studentModel.
      findOneAndUpdate({
        Name: studentName,
        studentID,
        schoolName,
        schoolID
        },
        studentData,
        options
      ).
      then((studentData0) => {

        winstonLogger.info('UPDATE: student profileInfo')
        winstonLogger.info(JSON.stringify(studentData0,null,4))
        
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: true
        })
        
      }).catch((e) => {

        winstonLogger.error('ERROR: udpating student data')
        winstonLogger.error(e)

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
  async getStudentContactInfo(studentName,studentID){

    //
    let ContactInfo = null

      await studentService._studentModel.
      findOne({
        Name: studentName,
        studentID
      }).
      then((studentData) => {

        winstonLogger.info('GET: student contactInfo')
        winstonLogger.info(JSON.stringify(studentData,null,4))

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: profileInfo
        })
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting contactInfo')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

  },
  async updateStudentContactInfo(schoolName,fullName,studentID,contactInfo){
    
    let res = null 

    const options = {
      new: true,
      safe: true,
      upsert: true
    }

      await studentService._studentModel.
      findOneAndUpdate({
        Name: fullName,
        studentID,
        schoolName
        },
        contactInfo,
        options
      ).
      then((studentData) => {

        if(studentData){
          winstonLogger.info('UPDATE: student contact info')
          winstonLogger.info(JSON.stringify(studentData,null,4))
          res = studentData
        }

      }).catch((e) => {

        winstonLogger.error('ERROR: updating student contact info')
        winstonLogger.error(e.messsage)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: res
      })

  },
  async getStudentAcademicInfo(schoolName,fullName,studentID){
    
    let res = null

      await studentService._studentModel.
      findOne({
        fullName,
        studentID,
        schoolName
      }).
      then((studentData) => {

        winstonLogger.info('GET: student Academic info')
        winstonLogger.info(JSON.stringify(studentData,null,4))

        if(studentData){
          res = {
            schoolName: studentData.schoolName,
            admission_status: studentData.admission_status,
            class: studentData.classAlias,
            Activity: studentData.activity.Name
          }
        }

        
      }).catch((e) => {

        winstonLogger.error('ERROR: updating student contact info')
        winstonLogger.error(e.messsage)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })
      
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: res
      })

  },
  async getGuardianInfo(schoolName,fullName,studentID){
    
    let guardInfo = null

      await studentService._studentModel.
      findOne({
        fullName,
        studentID,
        schoolName
      }).
      then((studentData) => {

        winstonLogger.info('GET: student Guardian info')
        winstonLogger.info(JSON.stringify(studentData,null,4))

        if(studentData){
          guardInfo = studentData.parent
        }
        
      }).catch((e) => {

        winstonLogger.error('ERROR: updating student Guardian info')
        winstonLogger.error(e.messsage)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: guardInfo
      })

  },

}

export default studentService