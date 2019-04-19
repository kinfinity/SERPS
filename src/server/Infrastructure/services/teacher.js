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
import documentsController from '../../interfaces/controllers/documentsController';
import profileManagementController from '../../interfaces/controllers/profileManagementController';

export default {

  // Authenticates an already existing user
  async authenticate(params) {

    // Holder for response data
    let payload = null;

    console.
    log('\t:::CLIENT CONNECTED (accessing authenticate function)::: with');
    console.log(params);
    // Call controller which handles authentication
    await authenticationController.authenticateTeacher(
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
    await authenticationController.logoutTeacher(params.Token).
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
    //profileManagementController
    async getTeacherInfo(teacherName,teacherID){
      return profileManagementController.getTeacherInfo(teacherName,teacherID);
    },
    async updateTeacher(teacherName,teacherID,teacherData){
        return profileManagementController.updateTeacher(teacherName,teacherID,teacherData);
    },
    async createStudentHealthReport(studentID,teacherID,healthData){
        return profileManagementController.createStudentHealthReport(studentID,teacherID,healthData);
    },
    async getStudentHealthReport(studentID,teacherID){
        return profileManagementController.getStudentHealthReport(studentID,teacherID);
    },
    async updateStudentHealthReport(studentID,teacherID){
        return profileManagementController.updateStudentHealthReport(studentID,teacherID);
    },
    async removeStudentHealthReport(studentID,teacherID){
        return profileManagementController.removeStudentHealthReport(studentID,teacherID);
    },
  

    // notificationController
    getNotifications(){
      return notificationAdapter.getLatest(); // max=10
    },

    async getSubjectTimetable(){},
    async getClassTimetable(){},

    
    async uploadStudentResults(){},
    async viewStudentresult(student){},
    async updateAttendance(Attendance){},//list of students and bool
    // documentsController
    async uploadLectureNote(type,subject,Class,lectureNoteData,teacherID){
      return documentsController.uploadLectureNote(type,subject,Class,lectureNoteData,teacherID);
    },
    async getLectureNote(type,subject,Class,noteTitle){
        return documentsController.getLectureNote(type,subject,Class,noteTitle);
    },
    async deletelectureNote(type,subject,Class,noteTitle,teacherID){
        return documentsController.deleteLectureNote(type,subject,Class,noteTitle,teacherID);
    },
    async uploadLectureCuriculum(type,subject,Class,lectureCuriculumData,teacherID){
      return documentsController.uploadLectureCuriculum(type,subject,Class,lectureCuriculumData,teacherID);
    },
    async getLectureCuriculum(type,subject,Class,lectureCuriculumTitle){
        return documentsController.getLectureCuriculum(type,subject,Class,lectureCuriculumTitle);
    },
    async deleteLectureCuriculum(type,subject,Class,lectureCuriculumTitle,teacherID){
        return documentsController.deleteLectureNote(type,subject,Class,lectureCuriculumTitle,teacherID);
    },
    async getAssignment(AssisgnmentTitle,subject,Class){
        return documentsController.getAssignment(AssisgnmentTitle,subject,Class);
    },
    async uploadAssignment(AssignmentData,subject,Class,teacherID){
        return documentsController.uploadAssignment(AssignmentData,subject,Class,teacherID);
    },
    async deleteAssignment(AssisgnmentTitle,subject,Class,teacherID){
        return documentsController.deleteAssignment(AssisgnmentTitle,subject,Class,teacherID);
    },
    //
    async getMessages(){},

    async updateHealthStatus(student){},
    async getHealthStatus(student){},
    async updateConduct(student){},
    async getConduct(student){}

};
