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

import authenticationController from '../../interfaces/controllers/authenticationController';
import singUpController from '../../interfaces/controllers/signUpController';
import profileManagementController from '../../interfaces/controllers/profileManagementController';

export default {

  // Creates a new student in the database
  async signupStudent(params) {

    let payload = null;
    await singUpController.createStudent(params)
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
    await authenticationController.authenticateStudent(
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
    await authenticationController.logoutStudent(params.Token).
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
            params.guardianName,
            params.guardianemail,
            params.guardianPhoneNumber,
            params.guardianAddress,
            params.results,
            params.school,
            params.bioSummary,
            params.extracuricular,
            params.status,
            params.
        }
     * 
     */
    //profileManagementController
    async getStudentPersonalInfo(studentName,studentID){
      return profileManagementAdapter.getStudentPersonalInfo(studentName,studentID);
    },
    async getStudenAcademictInfo(studentName,studentID){
        return profileManagementAdapter.getStudentAcademicInfo(studentName,studentID);
    },
    async getStudentHealthInfo(studentName,studentID){
        return profileManagementAdapter.getStudentHealthInfo(studentName,studentID);
    },
    async getStudentGuardianInfo(studentName,studentID){
        return profileManagementAdapter.getStudentGuardianInfo(studentName,studentID);
    },
    async updateStudent(teacherName,teacherID,teacherData){
        return profileManagementAdapter.updateStudent(teacherName,teacherID,teacherData);
    },
    async getStudentHealthReport(studentID){
        return profileManagementAdapter.getStudentHealthReport(studentID);
    },

    // notificationController
    getNotifications(){
      return notificationAdapter.getLatest(); // max=10
    },

    //
    async getLectureNotes(subjectalias){},
    async getTimetable(){},
    async generateParentKey(){},

    async viewresults(){}
    
};
