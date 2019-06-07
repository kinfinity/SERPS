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
        winstonLogger.info(result)
        Data = result

    })
    .catch((err) => {
        winstonLogger.error('ERROR: signUp')
        winstonLogger.error(err)
        return  Promise.resolve({
          status: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Token: null
        })
    })

    if(Data == null){

        return  Promise.resolve({
            status: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Token: null
        })

    }
    // done with SIGNUP 
    let payloadA = null
    // authenticate student -> creates token
     await this.authenticate({
        email: Data.email,
        password: Data.password
    }).
    then((result) => payloadA = result)
    .catch((err) => {

        winstonLogger.error('ERROR: authentication')
        winstonLogger.error(err)
        return  Promise.resolve({
          status: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Token: null
        })

    })

    winstonLogger.info("SIGNUP PAYLOAD")
    winstonLogger.info(JSON.stringify(payloadA))

    return payloadA

  },
  // Authenticates an already existing user
  async authenticate(params) {

    // Holder for response data
    let payload = null
    winstonLogger.info('AUTHENTICATION')
    winstonLogger.info(params)
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
    winstonLogger.info(JSON.stringify(payload))

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
    async getStudentPersonalInfo(studentName,studentID){
      return profileManagementController.getStudentPersonalInfo(studentName,studentID)
    },
    async updateContactInfo(studentName,studentID,contactInfo){
      return profileManagementController.updateStudentContactInfo(studentName,studentID,contactInfo)
    },
    async getStudentAddressInfo(studentName,studentID){
      return profileManagementController.getStudentAddressInfo(studentName,studentID)
    },
    async updateStudentAddressInfo(studentName,studentID,AddressInfo){
      return profileManagementController.updateStudentGuardianInfo(studentName,studentID,AddressInfo)
    },
    async getStudentAcademictInfo(studentName,studentID){
        return profileManagementController.getStudentAcademicInfo(studentName,studentID)
    },
    async getStudentGuardianInfo(studentName,studentID){
        return profileManagementController.getStudentGuardianInfo(studentName,studentID)
    },
    async updateStudentGuardianInfo(studentName,studentID,guardianInfo){
      return profileManagementController.updateStudentGuardianInfo(studentName,studentID,guardianInfo)
    },


    // notificationController
    getNotifications(){
      return notificationController.getNotifications() // max=10
    },

    // documentController
    async getLectureNotes(subjectAlias,classAlias){
      return documentsController.getLectureNotes(subjectAlias,classAlias)
    },

    // timeTableController
    async getTimetable(classAlias){
      return timeTableController.getClassAliasTimetable(classAlias)
    },

    // accountManagementController
    async generateParentKey(studentName,studentID){
      return accountManagementController.generateParentKey(studentName,studentID)
    },

    // educationController
    async viewresults(studentID){
      return educationManagementController.getStudentResults(studentID)
    }
    
}
