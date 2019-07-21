/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 17 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * studentServices: () :
 *
 * Function:
 *      signup()
 *      senddata()
 *      authenticate()  | LOGIN
 *      signout()       | LOGOUT
 */

import authenticationController from '../../interfaces/controllers/authenticationController'
import singUpController from '../../interfaces/controllers/signUpController'
import profileManagementController from '../../interfaces/controllers/profileManagementController'
import notificationController from '../../interfaces/controllers/notificationController'
import educationManagementController from '../../interfaces/controllers/educationManagementController'
import timeTableController from '../../interfaces/controllers/timeTableController'
import documentsController from '../../interfaces/controllers/documentsController'
import accountManagementController from '../../interfaces/controllers/accountManagementController'
import publicEnums from '../../app/publicEnums'
import winstonLogger from '../utils/winstonLogger'

export default {

  // Creates a new student in the database
  async signupStudent(params) {

    winstonLogger.info('SIGNUP')
    
    let Data = null
    // create student
    await singUpController.createStudent(params)
    .then((result) => {

        winstonLogger.info("aquiring SIGNUP DATA")
        winstonLogger.info(JSON.stringify(result,null,4))
        Data = result.Data

    })
    .catch((err) => {
        winstonLogger.error('ERROR: signUp')
        winstonLogger.error(err.stack)

        return  Promise.resolve({
          status: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Token: null
        })
    })

    if(!Data){

      winstonLogger.info('SIGN-UP:')
      winstonLogger.info(JSON.stringify(Data,null,4))

        return  Promise.resolve({
            status: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Token: null
        })

    }
    // done with SIGNUP 
    let payloadA = null
    winstonLogger.info('DATA:')
    winstonLogger.info(JSON.stringify(Data,null,4))
    // authenticate student -> creates token
     await this.authenticate({
        email: Data.email,
        password: Data.password
    }).
    then((result) => payloadA = result)
    .catch((err) => {

        winstonLogger.error('ERROR: authentication')
        winstonLogger.error(err.stack)

        return  Promise.resolve({
          status: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Token: null
        })

    })

    winstonLogger.info("SIGNUP PAYLOAD")
    winstonLogger.info(JSON.stringify(payloadA,null,4))

    return payloadA

  },
  // Authenticates an already existing user
  async authenticate(params) {

    // Holder for response data
    let payload = null
    winstonLogger.info('AUTHENTICATION')
    winstonLogger.info(JSON.stringify(params,null,4))
    // Call controller which handles authentication
    await authenticationController.authenticateStudent(
      params.email,
      params.password
    ).
    then((result) => {

      // Succeeded user authentication, prepare to sendout payload
      payload = result

    }).
    catch((err) => {


      // failed authenticating user send errorCode[statusCode] and empty token
      payload = {
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Token :null
      }

    })
    winstonLogger.info('AUTHENTICATION PAYLOAD:')
    winstonLogger.info(JSON.stringify(payload,null,4))

      return  payload

  },

  // Signout an already authenticated user
  async signout(params) {

    // Holder for response data
    let payload = null

    winstonLogger.info('SIGNOUT')
    winstonLogger.info(`Sent -> ${params}`)
    winstonLogger.info(params)
    // Call controller which handles logout
    await authenticationController.logoutStudent(params.Token).
    then((result) => {

      // Succeeded user logout, prepare response
          payload = result

      })
      .catch((err) => {

        // Logout failed sending response
          payload = {'response': false}

      })
      winstonLogger.info(`:::CLIENT PAYLOAD: `)
      winstonLogger.info(payload)

      return  payload

  },
  
   /**
     * 
     */
    //profileManagementController
    async getStudentPersonalInfo(schoolName,fullName,studentID){
      return profileManagementController.getStudentPersonalInfo(schoolName,fullName,studentID)
    },
    async updateContactInfo(schoolName,fullName,studentID,contactInfo){
      return profileManagementController.updateStudentContactInfo(schoolName,fullName,studentID,contactInfo)
    },
    async getStudentAddressInfo(schoolName,schoolID,studentName,studentID){
      return profileManagementController.getStudentAddressInfo(schoolName,schoolID,studentName,studentID)
    },
    async updateStudentAddressInfo(schoolName,schoolID,studentName,studentID,AddressInfo){
      return profileManagementController.updateStudentGuardianInfo(schoolName,schoolID,studentName,studentID,AddressInfo)
    },
    async getStudentAcademictInfo(schoolName,fullName,studentID){
        return profileManagementController.getStudentAcademicInfo(schoolName,fullName,studentID)
    },
    async getGuardianInfo(schoolName,fullName,studentID){
        return profileManagementController.getGuardianInfo(schoolName,fullName,studentID)
    },

    // notificationController
    getNotifications(schoolName,schoolID,fullName,studentID){
      // school notifications
      return notificationController.getNotifications(schoolName,schoolID) // max=10
      //no student specific notifications yet
    },

    // 

    // documentController
    async getLectureNotes(schoolName,schoolID,subjectAlias,classAlias){
      return documentsController.getLectureNotes(schoolName,schoolID,subjectAlias,classAlias)
    },

    // timeTableController
    async getTimetable(schoolName,classAlias){
      return timeTableController.getClassTimetable(schoolName,classAlias)
    },

    // accountManagementController
    async generateParentKey(schoolName,schoolID,studentName,studentID){
      return accountManagementController.generateParentKey(schoolName,schoolID,studentName,studentID)
    },

    // educationController
    async viewresults(schoolName,schoolID,studentName,studentID){
      return educationManagementController.getStudentResults(schoolName,schoolID,studentName,studentID)
    }
    
}
