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

import authenticationController from '../../interfaces/controllers/authenticationController';
import singUpController from '../../interfaces/controllers/signUpController';
import notificationController from '../../interfaces/controllers/notificationController';
import paymentManagementController from '../../interfaces/controllers/paymentManagementController';
import profileManagementController from '../../interfaces/controllers/profileManagementController';
import educationManagementController from '../../interfaces/controllers/educationManagementController';
import timeTableController from '../../interfaces/controllers/timeTableController';

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

    let payload = null;
    await singUpController.createParent(params)
    .then((result) => {
        payload = result;
    })
    .catch((err) => {
        console.log(err);
        payload = null;
    });
    console.log('FINALLY HERE WITH PAYLOAD');
    console.log(payload);

  return payload;

},


  // Authenticates an already existing user
  async authenticate(params) {

    // Holder for response data
    let payload = null;

    console.
    log('\t:::CLIENT CONNECTED (accessing authenticate function)::: with');
    console.log(params);
    // Call controller which handles authentication
    await authenticationController.authenticateParent(
      params.email,
      params.password,
      params.username,
      params.metadata.get('clientID')
    ).
    then((result) => {

      // Succeeded user authentication, prepare to sendout payload
      payload = result;

    }).
    catch((err) => {

      // Creation of new user didn't work send back false, empty token and reason
      payload = {'result':false,'Token':null,'message':err.toString()};

    });
    console.log(`:::CLIENT PAYLOAD:`);
    console.log(payload);

      return  payload;

  },

  // Signout an already authenticated user
  async signout(params) {

    // Holder for response data
    let payload = null;

    console.
    log('\t:::CLIENT CONNECTED (accessing signout function):::');
    console
    .log(`Sent -> ${params}`);
    console.log(params);
    // Call controller which handles logout
    await authenticationController.logoutParent(params.Token).
    then((result) => {

      // Succeeded user logout, prepare response
          payload = result;

      })
      .catch((err) => {

        // Logout failed sending response
          payload = {'response': false};

      });
      console.log(`:::CLIENT PAYLOAD: `);
      console.log(payload);

      return  payload;

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
    async createParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData){
      return paymentManagementController.createParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData);
    },
    async getPaymentInfo(ParentPaymentInfoAlias){
        return paymentManagementController.getParentPaymentInfo(ParentPaymentInfoAlias);
    },
    async updatePaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData){
        return paymentManagementController.updateParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData);
    },
    async viewParentPaymentTransactionHistory(ParentName,ParentID){// TransactionID Term bank[parent] accNo Receipt
        return paymentManagementController.viewParentPaymentTransactionHistory(ParentName,ParentID);
    },
    async payTution(ParentName,ParentID,StudentID){// TransactionID Term bank[parent] accNo Receipt
      return paymentManagementController.payTution(ParentName,ParentID,StudentID);
  },

    // profileManagementController
    async createProfileInfo(profileInfo){
      return profileManagementController.createParentProfileInfo(profileInfo);
    },
    async getProfileInfo(ParentName,ParentID){
      return profileManagementController.getParentProfileInfo(ParentName,ParentID);
    },
    async getContactInfo(ParentName,ParentID){
      return profileManagementController.getParentContactInfo(ParentName,ParentID);
    },
    async updateContactInfo(contactInfo){
        return profileManagementController.updateParentContactInfo(contactInfo);
    },
    async getAddressInfo(ParentName,ParentID){
        return profileManagementController.getParentAddressInfo(ParentName,ParentID);
    },
    async updateAddressInfo(addressInfo){
        return profileManagementController.updateParentContactInfo(addressInfo);
    },
    async getHealthInfo(studentName,studentID){
      return profileManagementController.getStudentHealthInfo(studentName,studentID);
    },
    async updateHealthInfo(studentID){
        return profileManagementController.getStudentHealthReport(studentID);
    },
    async getHealthStatus(studentID){
        return profileManagementController.getStudentHealthReports(studentID);
    },

    // notificationController
    async getNotifications(){
      return notificationController.getLatest(); // max=10
    },

    // educationManagementController
    async getAttendance(studentID){
      return educationManagementController.getStudentAttendance(studentID);
    },
    async getActivities(studentID){
        return educationManagementController.getStudentActivities(studentID);
    },
    async getActivityNotification(activityAlias){
        return educationManagementController.getActivityNotification(activityAlias);
    },
    async getResults(studentID){
        return educationManagementController.getStudentResults(studentID);
    },

    //
    getClassTimetable(ClassAlias){
      return timeTableController.getClassTimetable(ClassAlias);
    },

};
