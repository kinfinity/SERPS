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
import SchoolSessionModel from '../models/SchoolSessionModel'
import tokenService from '../services/tokenService'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'

const schoolService = {

  // handle for the SchoolModel
  _schoolModel: SchoolModel,
  _schoolSessionModel: SchoolSessionModel,
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

    winstonLogger.info('SCHOOL DATA:')
    winstonLogger.info(JSON.stringify(schoolData,null,4))
    let response = null
    let response1 = null
    let response2 = null
    let tempData = null
    let id = null

    // Try email
    await schoolService._schoolModel.
    findOne({email: schoolData.detail}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('Email found:')
        tempData = Data
        winstonLogger.info(JSON.stringify(Data.email,null,4))
        response1 = true
        id = schoolData.detail

      }

    }).
    catch((err) => {
      
      //
      response1 = false

    })

    // Try Name
    await schoolService._schoolModel.
    findOne({schoolID: schoolData.detail}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('schoolID found:')
        tempData = Data
        winstonLogger.info(Data.schoolID)
        response2 = true
        id = schoolData.detail

      }

    }).
    catch((err) => {

      //
      winstonLogger.info('ERROR: searching for name')
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
  
    await Password.compare(schoolData.password, tempData.password).
    then((matched) => {
    
      // Password matched
      winstonLogger.info(`password matched ? ${matched}`)
      res = Promise.resolve(matched)

    }).
    catch((err) => Promise.reject(err))

    if (!res) {

      response = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Token: null
      }

      return response

    }
    
    let Token = null
    // Return a boolean(true) and signed JWT
    await Promise.resolve(tokenService.generateToken({
          email: tempData.email,
          schoolName: tempData.Name,
          schoolID: tempData.schoolID
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
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
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

      let profileInfo = null

      await schoolService._schoolModel.
      findOne({
        Name: schoolName,
        schoolID
      }).then((schoolData) => {

        // pack in only the school's basic profile info
        profileInfo = {
          Name: schoolData.Name,
          Logo: schoolData.Logo,
          Images: schoolData.Images,
          motto: schoolData.motto,
          admissionStatus: schoolData.admissionStatus
        }
        winstonLogger.info('school profileInfo')
        winstonLogger.info(JSON.stringify(profileInfo,null,4))

      }).catch((e) => {

        winstonLogger.error('error getting school Data')
        winstonLogger.error(e)

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

    async updateSchoolInfo(schoolName,schoolID,schoolData){

      let res = null 

      const options = {
        new: true,
        upsert: true,
        safe: true
      }

      winstonLogger.info('schoolData:')
      winstonLogger.info(JSON.stringify(schoolData,null,4))

      // schoolID: schoolID
      await schoolService._schoolModel.
      findOneAndUpdate({
        Name: schoolName,
        schoolID
        },
        schoolData,
        options
      ).
      then((updatedSchoolData) => {

        winstonLogger.info('UPDATED data')
        winstonLogger.info(updatedSchoolData)
        
        res = updatedSchoolData

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: true
        })
        
      }).
      catch((e) => {

        winstonLogger.error('error getting school Data')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: false
        })

      }) 

      return res

    },


    async getSchoolContactInfo(schoolName,schoolID){

      let contactInfo = null

      await schoolService._schoolModel.
      findOne({
        Name: schoolName,
        schoolID
      }).then((schoolData) => {

        // pack in only the school's basic contact info
        contactInfo = {
          email: schoolData.email,
          address: schoolData.Address
        }
        winstonLogger.info('school profileInfo')
        winstonLogger.info(JSON.stringify(contactInfo,null,4))

      }).catch((e) => {

        winstonLogger.error('error getting school Data')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: contactInfo
      })

    },

    async updateSchoolContactInfo(schoolName,schoolID,contactInfo){

      let res = null 

      const options = {
        new: true,
        safe: true,
        upsert: true
      }

      winstonLogger.info('contactInfo:')
      winstonLogger.info(JSON.stringify(contactInfo,null,4))

      // schoolID: schoolID
      await schoolService._schoolModel.
      findOneAndUpdate({
        Name: schoolName,
        schoolID
        },
        {
          email: contactInfo.email,
          Address: contactInfo.Address
        },
        options
      ).
      then((updatedSchoolData) => {

        winstonLogger.info('UPDATED:')
        winstonLogger.info(JSON.stringify(updatedSchoolData,null,4))
        
        res = true
        
      }).
      catch((e) => {

        winstonLogger.error('error updating school contactInfo')
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

    // getschoolPaymentInfo
    async getSchoolPaymentInfo(schoolName,schoolID){

      let paymentInfo = null
      winstonLogger.info('DATA:')
      winstonLogger.info(schoolName)
      winstonLogger.info(schoolID)

      await schoolService._schoolModel.
      findOne({
        Name: schoolName,
        schoolID
      }).then((schoolData) => {

        // pack in only the school's basic contact info
        winstonLogger.info('school profileInfo')
        winstonLogger.info(JSON.stringify(schoolData,null,4))
        paymentInfo = schoolData.paymentInfo

      }).catch((e) => {

        winstonLogger.error('error getting school Data')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: paymentInfo
      })
    },

    async updateSchoolPaymentInfo(schoolName,schoolID,paymentInfo){

      let res = null 

      const options = {
        new: true
      }

      winstonLogger.info('paymentInfo:')
      winstonLogger.info(JSON.stringify(paymentInfo,null,4))

      // schoolID: schoolID
      await schoolService._schoolModel.
      findOneAndUpdate({
        Name: schoolName,
        schoolID
        },
        {paymentInfo: paymentInfo},
        options
      ).
      then((updatedSchoolData) => {

        winstonLogger.info('UPDATED:')
        winstonLogger.info(JSON.stringify(updatedSchoolData,null,4))
        
        res = true
        
      }).
      catch((e) => {

        winstonLogger.error('error updating school contactInfo')
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

    async createPaymentInfo(schoolName,schoolID,paymentData){

      //
      let paymentInfoObj = null

      winstonLogger.info('CREATE: payment')
      winstonLogger.info(JSON.stringify(paymentData,null,4))
      const data = {
        Name: schoolName,
        schoolID,
        bankName: paymentData.bankName, 
        AccountNummber: paymentData.AccountNumber
      }
      const paymentIM = new PaymentInfoModel(data)
      //
      await paymentIM.
      save().
      then((xpaymentInfo) => {

        winstonLogger.info('CREATE: paymentInfo')
        winstonLogger.info(xpaymentInfo)

        paymentInfoObj = ObjectId(xpayment._id)
        
      }).
      catch((e) => {

        winstonLogger.error('ERROR: creating paymentInfo')
        winstonLogger.error(e)

        return Promise.resolve(null)

      }) 

      return Promise.resolve(paymentInfoObj)

    },
    //
    async removeClassfromSchool(schoolName,schoolID,classData){
      
      const options = {
        new: true
      }

      await schoolService._schoolModel.
      findOneAndUpdate({
          name:schoolName,
          schoolID
          },
          {
            $push: {
              classList: {
                className: classData._className,
                classAlias: classData._classAlias,
                classRef: classData._classID
              }
            }
          },
          options
      ).
      then((result) => {
        
          //
          winstonLogger.info('UPDATE: adding class to school document')
          winstonLogger.info(result)

      }).catch((e) => {

          //
          winstonLogger.error('ERROR: adding class to school document')
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
    async addClasstoSchool(SchoolName,SchoolID,classData){
        
        const options = {
          new: true,
          upsert: true,
          safe: true
        }
        winstonLogger.info('HERE WE RE')
        winstonLogger.info(SchoolName)
        winstonLogger.info(SchoolID)
        winstonLogger.info(JSON.stringify(classData,null,4))

        await schoolService._schoolModel.
        findOneAndUpdate({
            Name: SchoolName,
            schoolID : SchoolID
            },
            {
              $push: {
                classList: {
                  className: classData._className,
                  classAlias: classData._classAlias,
                  classRef: classData._classID
                }
              }
            },
            options
        ).
        then((result) => {
          
            //
            winstonLogger.info('UPDATE: adding class to school document')
            winstonLogger.info(result)

        }).catch((e) => {

            //
            winstonLogger.error('ERROR: adding class to school document')
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

    //
    
    async addSession(schoolName,schoolID,SessionID){
        
      const options = {
        new: true,
        safe: true,
        upsert: true
      }

      winstonLogger.info(`SESSION-ID: ${SessionID}`)
      await schoolService._schoolModel.
      findOneAndUpdate({
          Name:schoolName,
          schoolID
          },
          {
            currentSessionID: SessionID
          },
          options
      ).
      then((result) => {
        
          //
          winstonLogger.info('UPDATE: updating currentSessionID in school document')
          winstonLogger.info(JSON.stringify(result,null,4))

      }).catch((e) => {
          //
          winstonLogger.error('ERROR: updating currentSessionID in school document')
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
  //
  async addSubjectHolder(schoolName,schoolID,subjectName,subjectID){
        
    const options = {
      new: true,
      upsert: true,
      safe: true
    }

    winstonLogger.info(`SUBJECT-ID: ${subjectID}`)
    await schoolService._schoolModel.
    findOneAndUpdate({
        Name:schoolName,
        schoolID
        },
        {
          $push: {
            subjects:{
              subjectName,
              subjectID
            }
          }
        },
        options
    ).
    then((result) => {
      
        //
        winstonLogger.info('UPDATE: adding subject to school document')
        winstonLogger.info(JSON.stringify(result,null,4))

    }).catch((e) => {
        //
        winstonLogger.error('ERROR: adding subject to school document')
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
  async removeSubjectHolder(schoolName,schoolID,subjectName,subjectID){
        
    const options = {
      new: true,
      upsert: true,
      safe: true
    }

    winstonLogger.info(`SUBJECT-ID: ${subjectID}`)
    await schoolService._schoolModel.
    findOneAndRemove({
        Name:schoolName,
        schoolID
        },
        {
          $pull: {
            subjects:{
              subjectName,
              subjectID
            }
          }
        },
        options
    ).
    then((result) => {
      
        //
        winstonLogger.info('UPDATE: removing subject from school document')
        winstonLogger.info(JSON.stringify(result,null,4))

    }).catch((e) => {
        //
        winstonLogger.error('ERROR: removing subject from school document')
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

  //
  async removeActivityfromSchool(schoolName, schoolID, activityAlias, activityID){
    const options = {
      new: true,
      upsert: true,
      safe: true
    }

    winstonLogger.info(`ACTIVITY-ID: ${activityID}`)
    await schoolService._schoolModel.
    findOneAndUpdate({
        Name:schoolName,
        schoolID
        },
        {
          $pull: {
            subjects:{
              Name: activityAlias,
              activityID
            }
          }
        },
        options
    ).
    then((result) => {
      
        //
        winstonLogger.info('UPDATE: removing activity from school document')
        winstonLogger.info(JSON.stringify(result,null,4))

    }).catch((e) => {
        //
        winstonLogger.error('ERROR: removing activity from school document')
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
  async addActivitytoSchool(schoolName, schoolID, activityAlias, activityID){

    const options = {
      new: true,
      upsert: true,
      safe: true
    }

    winstonLogger.info(`ACTIVITY-ID: ${activityID}`)
    await schoolService._schoolModel.
    findOneAndUpdate({
        Name:schoolName,
        schoolID
        },
        {
          $push: {
            activities:{
              Name: activityAlias,
              activityID
            }
          }
        },
        options
    ).
    then((result) => {
      
        //
        winstonLogger.info('UPDATE: adding activity to school document')
        winstonLogger.info(JSON.stringify(result,null,4))

    }).catch((e) => {
        //
        winstonLogger.error('ERRORadding activity to school document')
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

  //
  async getAdmissionStatus(schoolName,schoolID){
    //
    let response = null

    await schoolService._schoolModel.
    find({
      Name: schoolName,
      schoolID
    }).
    then((result) => {

      // 
      winstonLogger.info('GET: admission status ')
      winstonLogger.info(JSON.stringify(result,null,4))

      if(result){
        response = {
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: result.admissionStatus
        }
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting admission status')
      winstonLogger.error(e)

      response = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return Promise.resolve(response)

  },  
  async openAdmission(schoolName,schoolID,publicIdentifier){
    //
    let response = null, hI = null
    
    const options = {
      new: true,
      safe: true
    }
    await Password.hash(publicIdentifier).
    then((hashedIdentifier) => {

        // Succeeded in saving new user to DB
        winstonLogger.info(' -> hashedIdentifier')
        winstonLogger.info(hashedIdentifier)
        hI = hashedIdentifier

    }).catch((err) => {

      winstonLogger.error('Identifier NOT HASHED')
      winstonLogger.error(err.stack)  

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: null
      })

    })


    await schoolService._schoolModel.
    findOneAndUpdate({
        Name: schoolName,
        schoolID
      },
      {
        public_ACCESS_CODE: hI,
        admissionStatus: true
      },
      options
    ).
    then((result) => {

      // 
      winstonLogger.info('UPDATE: open admission ')
      winstonLogger.info(JSON.stringify(result,null,4))

      if(result){
        response = {
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: result.admissionStatus
        }
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: openning admission')
      winstonLogger.error(e)

      response = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return Promise.resolve(response)

  },
  async closeAdmission(schoolName,schoolID){
        //
        let response = null

        const options = {
          new: true,
          safe: true
        }
    
        await schoolService._schoolModel.
        findOneAndUpdate({
            Name: schoolName,
            schoolID
          },
          {
            admissionStatus: false
          },
          options
        ).
        then((result) => {
    
          // 
          winstonLogger.info('UPDATE: open admission ')
          winstonLogger.info(JSON.stringify(result,null,4))
    
          if(result){
            response = {
              statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
              Data: result.admissionStatus
            }
          }
    
        }).        
        catch((e) => {
    
          winstonLogger.error('ERROR: closing admission')
          winstonLogger.error(e)
    
          response = {
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: false
          }
    
        })
    
        return Promise.resolve(response)

  },
  async addtimeTable(schoolName,schoolID,classAlias,timeTableID){

    let response = null, classx = null, classr = null
    winstonLogger.info('SCHOOL ADD TIMETABLE DATA:')
    winstonLogger.info(timeTableID)
    winstonLogger.info(schoolName)
    winstonLogger.info(schoolID)
    winstonLogger.info(classAlias)
    //
    const  options = {
      new: true,
      safe: true,
      upsert: true
    }

    // find class
    await schoolService._schoolModel.
    findOne({
      Name:schoolName,
      schoolID
    }).
    then((Data) => {
      if(Data)
      {
        for(classr in Data.classList)
        {
          if(Number.isInteger(parseInt(classr)))
          {
              winstonLogger.info('CLASS')
              winstonLogger.info(classr)
              if(Data.classList[classr].classAlias === classAlias)
              {
                  winstonLogger.info('CLASS_INDEX:')
                  winstonLogger.info(classr)
                  classx = classr
              }
          }
        }
      }
    })
    await schoolService._schoolModel.
    findOneAndUpdate({
        Name: schoolName,
        schoolID
        },
        {
            // '$set :classList.$.0.timeTableID': timeTableID 
        },
        options 
    ).
    then((result) => {
      
        //
        winstonLogger.info('ADD: timeTableID to school')
        result.classList[classx].timeTableID = timeTableID // isn't persisted
        // schoolService._schoolModel.save(result).then().catch()
        winstonLogger.info(JSON.stringify(schoolService._schoolModel,null,4))
        winstonLogger.info(JSON.stringify(result,null,4))
        response = result
        
    }).
    catch((e) => {
      
        winstonLogger.error('ERROR: adding timeTableID to school')
        winstonLogger.error(e.stack)
        winstonLogger.error(e.message)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
          Data: false
        })

    })

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
      Data: response
    })

  }
  
}

export default schoolService