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
import SchoolModel from '../models/SchoolModel'
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
    winstonLogger.info(`FULLNAME: ${JSON.stringify(Name,null,4)}`)
    // Check if user exists first returns promise resolved to true or false
    await studentService.studentExists({email,Name}).
    then((result) => {

      winstonLogger.info('searching DB for student')
      // Email exists in database
        response = result

    }).
    catch((e) => {
      winstonLogger.info('ERROR: checking DB for student')
      winstonLogger.error(e)

      Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    })
    // Becomes true if user already exists and we kick out of function
    if (response) {

      // Return to higher scope if there's a user
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR_USEREXISTS,
        Data: null
      })

    }
    // get school publicIdentifier
    const schoolPI = null, schoolRef = null, schoolID = null
     studentService._schoolModel.
     findOne({
       Name: schoolName,
       public_ACCESS_CODE: publicIdentifier
     }).
     then((schoolData) => {
        winstonLogger.info('GET: school public_ACCESS_CODE')
        winstonLogger.info(schoolData.public_ACCESS_CODE)
        schoolPI = schoolData.public_ACCESS_CODE
        schoolRef = schoolData.school.schoolRef
        schoolID = schoolData.schoolID
     }).
     catch((e) => {
       winstonLogger.error('ERROR: getting school public_ACCESS_CODE')
       winstonLogger.error(e)

       return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

     })
    // verify school publicIdentifier
    const match = null
    await Password.compare(schoolPI,publicIdentifier).
    then((matched) => {
    
      // Password matched
      winstonLogger.info(`school code matched ? ${matched}`)
      match = Promise.resolve(matched)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: trying to match school public_ACCESS_CODE')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR_SCHOOLCODEMISMATCH,
        Data: null
      })

    })
    if(!match && !publicEnums.CLASS_LIST.match(classAlias)){
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR_SCHOOLCODEMISMATCH,
        Data: null
      })
    }

    // create temp StudentID
    const studentID = schoolID + Name.first + shortid.generate() 

    // create school Ref data for student
    const School = {
      Nam:schooName,
      schoolRef
    }
    // Create static Data for user
      const studentData = {
        School,
        studentID,
        Name,
        email,
        password,
        "class.classAlias": classAlias,
        gender,
        birthDate
      }
    const ipassword = studentData.password
    // Hash user password on first save
    await Password.hash(ipassword).
    then((hashedPassword) => {

      // Append Hashed password to static user Data
      studentData.password = hashedPassword
      // Create new user model
      const studenet = new StudentModel(studentData)
    
      // Save new user
      studenet.
      save().
      then((result) => {

        // Succeeded in saving new user to DB
        winstonLogger.info(' -> STUDENT CREATED')
        winstonLogger.info(result)
        result.password =  ipassword

        response = result

      }).
      catch((err) => {

        winstonLogger.error(' -> STUDENT NOT CREATED')
        winstonLogger.error(err)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

    }).catch((err) => {

      winstonLogger.error('STUDENT PASSWORD NOT HASHED')
      winstonLogger.error(err)  

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

    let response = null, tempData = null, id = null

    // Try email
    await studentService.
    _studentModel.
    findOne({email: studentData.email}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('email found')
        winstonLogger.info(Data)
        tempData = Data
        id = studentData.email
        response = true
      }

    }).
    catch((err) => {
      
      //
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    })


    if (!response) {

      winstonLogger.info('ERROR: authenticating')

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
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
    // Return a boolean(true) and signed JWT
    const Token = await Promise.resolve(tokenService.generateToken({
          email: tempData.email
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
      Name: studentE.Name
    }).
    then((Data) => {

      winstonLogger.info(`checking data base for user`)
      if(Data){
  
        if (Data.length === 0) {
          winstonLogger.info('user does not exists')
          result = Promise.resolve(false)
        }

        winstonLogger.info(`FOUND:  ${JSON.stringify(Data,null,4)}`)
        result = Promise.resolve(true)
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: checking database for student')
      winstonLogger.error(e)

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
  async getStudentPersonalInfo(studentName,studentID){

     let profileInfo = null

      await studentService._studentModel.
      findOne({
        Name: studentName,
        studentID
      }).
      then((studentData) => {

        // pack in only the school's basic profile info
        profileInfo = {
          Name: studentData.Name,
          email: studentData.email,
          address: studentData.address,
          shoolName: studentData.School.Name,
          admissionStatus: studentData.admission_Status
        }
        winstonLogger.info('GET: student profileInfo')
        winstonLogger.info(profileInfo)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: profileInfo
        })
        
      }).catch((e) => {

        winstonLogger.error('ERROR: getting student data')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

  },
  async updateStudent(studentName,studentID,studentData){

    //
    const options = {
      new: true
    }

      await studentService._studentModel.
      findOneAndUpdate({
        Name: studentName,
        studentID
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
  async updateStudentContactInfo(studentName,studentID,options){
    
      await studentService._studentModel.
      findOneAndUpdate({
        Name: studentName,
        studentID
        },
        studentData,
        options
      ).
      then((studentData) => {

        
        winstonLogger.info('UPDATE: student contact info')
        winstonLogger.info(JSON.stringify(studentData,null,4))

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: studentData
        })
        
      }).catch((e) => {

        winstonLogger.error('ERROR: updating student contact info')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

  },


}

export default studentService