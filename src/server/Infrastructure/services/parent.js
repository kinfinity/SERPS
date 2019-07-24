/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 17 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * parentServices: () :
 *
 * Function:
 *      signup()
 *      senddata()
 *      authenticate()  | LOGIN
 *      signout()       | LOGOUT
 */

import authenticationController from '../../interfaces/controllers/authenticationController'
import singUpController from '../../interfaces/controllers/signUpController'
import notificationController from '../../interfaces/controllers/notificationController'
import paymentManagementController from '../../interfaces/controllers/paymentManagementController'
import profileManagementController from '../../interfaces/controllers/profileManagementController'
import educationManagementController from '../../interfaces/controllers/educationManagementController'
import timeTableController from '../../interfaces/controllers/timeTableController'
import winstonLogger from '../utils/winstonLogger'
import publicEnums from '../../app/publicEnums'

export default {

  /**
     *
     *   {
            params.parentRegID,
            params.OTP,
        }
     * 
    */// Creates a new parent in the database
async signupParent(params) {

  winstonLogger.info('SIGNUP')
  
  let Data = null
  // create student
  await singUpController.createParent(params)
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
    await authenticationController.authenticateParent(
      params.email,
      params.password
    ).
    then((result) => {

      // Succeeded user authentication, prepare to sendout payload
      payload = result

    }).
    catch((err) => {

      winstonLogger.error('ERROR: authentication...')
      winstonLogger.error(err.stack)
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

    console.
    log('\t:::CLIENT CONNECTED (accessing signout function):::')
    console
    .log(`Sent -> ${params}`)
    winstonLogger.info(params)
    // Call controller which handles logout
    await authenticationController.logoutParent(params.Token).
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
     *   {
            params.name,
            params.lastName,
            params.phoneNumber,
            params.class,
            params,addresss,
            params.email,
            params.password,
            params.stateOfOrigin,
            params.localAreaOfOrigin,
            params.ward
        }
     * 
     */
    // paymentConotroller
    async createParentPaymentInfo(parentName,parentID){
      return paymentManagementController.getPaymentInfo(parentName,parentID)
    },
    async getPaymentInfo(ParentPaymentInfoAlias){
        return paymentManagementController.getParentPaymentInfo(ParentPaymentInfoAlias)
    },
    async updatePaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData){
        return paymentManagementController.updateParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData)
    },
    async viewParentPaymentTransactionHistory(parentName,parentID){// TransactionID Term bank[parent] accNo Receipt
        return paymentManagementController.viewParentPaymentTransactionHistory(parentName,parentID)
    },
    async payTution(parentName,parentID,StudentID){// TransactionID Term bank[parent] accNo Receipt
      return paymentManagementController.payTution(parentName,parentID,StudentID)
    },
    // paymentManagementController
    async getPaymentInfo(SchoolName,SchoolID){
      return paymentManagementController.getParentPaymentInfo(SchoolName,SchoolID)
    },
    async updatePaymentInfo(SchoolName,schoolID,paymentInfo){
        return paymentManagementController.updateParentPaymentInfo(SchoolName,schoolID,paymentInfo)
    },
    async viewPaymentTransactionHistory(SchoolName,SchoolID){// TransactionID month teacher bank[Teacher] accNo Receipt/Amount
        return paymentManagementController.viewParentPaymentTransactionHistory(SchoolName,SchoolID) 
    },

    // profileManagementController
    async getProfileInfo(parentName,parentID){
      return profileManagementController.getParentInfo(parentName,parentID)
    },
    async getContactInfo(parentName,parentID){
      return profileManagementController.getParentContactInfo(parentName,parentID)
    },
    async updateContactInfo(parentName,parentID,contactInfo){
        return profileManagementController.updateParentContactInfo(parentName,parentID,contactInfo)
    },
    async getAddressInfo(parentName,parentID){
        return profileManagementController.getParentAddressInfo(parentName,parentID)
    },
    async updateAddressInfo(addressInfo){
        return profileManagementController.updateParentContactInfo(addressInfo)
    },
    async getHealthInfo(studentName,studentID){
      return profileManagementController.getStudentHealthInfo(studentName,studentID)
    },
    async updateHealthInfo(studentID){
        return profileManagementController.getStudentHealthReport(studentID)
    },
    async getHealthStatus(studentID){
        return profileManagementController.getStudentHealthReports(studentID)
    },

    // notificationController
    async getNotifications(parentName,parentID){

      let schools = null , notifications = []

      winstonLogger.info('GET CHILD(REN) SCHOOL(S):')
      winstonLogger.info(parentName)
      winstonLogger.info(parentID)

      await profileManagementController.getChildrenInfo(parentName,parentID).
      then((studentInfo) => {

        winstonLogger.info('CHILDRENs Info:')
        winstonLogger.info(JSON.stringify(studentInfo,null,4))

        schools = studentInfo

      }).
      catch((e) => {

        winstonLogger.error('ERROR: getting children Info')
        winstonLogger.error(e.stack)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          data: null
        })

      })
      winstonLogger.info('SCHOOLS:')
      winstonLogger.info(JSON.stringify(schools,null,4))

      let schoolName = null, schoolID = null

      for(let index in schools){
        if(Number.isInteger(parseInt(index))){
          //
          schoolName = schools[index].schoolName
          schoolID = schools[index].schoolID
          notifications.push(Promise.resolve(notificationController.getNotifications(schoolName,schoolID)))

        }
      }

       return notifications

    },

    // educationManagementController
    async getAttendance(studentID){
      return educationManagementController.getStudentAttendance(studentID)
    },
    async getActivities(studentID){
        return educationManagementController.getStudentActivities(studentID)
    },
    async getActivityNotification(activityAlias){
        return educationManagementController.getActivityNotification(activityAlias)
    },
    async getResults(studentID){
        return educationManagementController.getStudentResults(studentID)
    },

    //
    getClassTimetable(ClassAlias){
      return timeTableController.getClassTimetable(ClassAlias)
    },

}
