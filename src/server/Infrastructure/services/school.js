/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 17 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * schoolServices: () :
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
import documentsController from '../../interfaces/controllers/documentsController';
import timeTableController from '../../interfaces/controllers/timeTableController';
import accountManagementController from '../../interfaces/controllers/accountManagementController';
import paymentManagementController from '../../interfaces/controllers/paymentManagementController';
import profileManagementController from '../../interfaces/controllers/profileManagementController';
import notificationController from '../../interfaces/controllers/notificationController';



export default {

  // Creates a new parent in the database
  async signupParent(params) {

    let payload = null;
    await singUpController.createSchoolAdmin(params)
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
    await authenticationController.authenticateSchoolAdmin(
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
    await authenticationController.logoutSchoolAdmin(params.Token).
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
            params.email,
            params.password,
            params.phoneNumber,
            params.motto,
            params.Address,
            params.sLogo,
            params.sImages,
            params.sIDPrefix
        }
     * 
     */
    // accountManagementController
    async createTeacher(teacherData){
      return accountManagementController.createTeacher(teacherData);
    },
    async removeStudent(studentName,studentID){
      return accountManagementController.removeStudent(studentName,studentID);
    },
    async createStudent(studentData){
        return accountManagementController.createStudent(studentData);
    },
    async removeTeacher(teacherName,teacherID){
        return accountManagementController.removeTeacher(teacherName,teacherID);
    },
    // profileManagementController
    async getTeacherInfo(teacherName,teacherID){
      return profileManagementController.getTeacherInfo(teacherName,teacherID);
    },
    async getStudentInfo(studentName,studentID){
        return profileManagementController.getStudentInfo(studentName,studentID);
    },
    async getParentInfo(ParentAlias){
        return profileManagementController.getParentInfo(ParentAlias);
    },
    async getSchoolInfo(ParentAlias,SchoolTitle){
        return profileManagementController.getSchoolInfo(ParentAlias,SchoolTitle);
    },
    async updateSchoolInfo(ParentAlias,SchoolTitle,SchoolData){
        return profileManagementController.updateSchoolInfo(ParentAlias,SchoolTitle,SchoolData);
    },

    //
    async updateData(Data) {},
    async getData(){},
    async getContactInfo(){},
    
    // paymentManagementController
    async createSchoolPaymentInfo(SchoolPaymentInfoData){
      return paymentManagementController.createSchoolPaymentInfo(SchoolPaymentInfoData);
    },
    async getSchoolPaymentInfo(SchoolPaymentInfoName,SchoolPaymentInfoID){
        return paymentManagementController.getSchoolPaymentInfo(SchoolPaymentInfoName,SchoolPaymentInfoID);
    },
    async updateSchoolPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID,TeacherPaymentInfoData){
        return paymentManagementController.updateSchoolPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID,TeacherPaymentInfoData);
    },
    async viewSchoolPaymentTransactionHistory(SchoolName,SchoolID){// TransactionID month teacher bank[Teacher] accNo Receipt/Amount
        return paymentManagementController.viewSchoolPaymentTransactionHistory(SchoolName,SchoolID); 
    },
    //

    async updateContactInfo(email, address, phoneNumber){},
    async updatePaymentInfo(Bank, accountNumber){},

    // notificationController
    getNotifications(){
      return notificationController.getNotifications(); // max=10
    },
    createNotification(Note){
        return notificationController.createNotification(Note);
    },
    updateNotification(noteTitle,noteID,noteImage,noteText){
        return notificationController.updateNotification(noteTitle,noteID,noteImage,noteText);
    },
    deleteNotification(noteTitle,noteID){
        return notificationController.deleteNotification(noteTitle,noteID);
    },

    // documentsController
    async validateLectureNote(type,subject,Class,lectureNoteData,teacherID){
      return documentsController.validateLectureNote(type,subject,Class,lectureNoteData,teacherID);
    },
    async getLectureNote(type,subject,Class,noteTitle){
        return documentsController.getLectureNote(type,subject,Class,noteTitle);
    },

    // timetableController
    getClassTimetable(Class){
      return timeTableController.getClassTimetable(Class);
    },
    getSubjectTimetable(subjectAlias,Class){
        return timeTableController.getSubjectTimetable(subjectAlias,Class);
    },
    createTimetable(timeTableData){
        return timeTableController.createTimetable(timeTableData); // list or Datastructure [list of lists]
    },
    updateTimetable(Class,subject,timeSlot){ // timeSlot Enum for class ranges
        return timeTableController.updateTimetable(Class,subject,timeSlot);
    },
    deleteTimetable(Class,timeTableID){
        return timeTableController.deleteTimetable(Class,timeTableID);
    },
    archiveTimetable(Class,timeTableID){
        return timeTableController.archiveTimetable(Class,timeTableID);
    },

    //
    async viewPendingResults(){},
    async validatePendingResult(SubjectResult){},

    async viewRegisteredStudent(registeredStudent){},
    async validateRegisteredStudent(){},

    async updateTeacherRole(teacher,Role){},
    async createclassSequence(){},

    async createExtracurricular(activity,activityDays,activityTime,activityManager){},
    async updateExtracurricular(activity,activityDays,activityTime,activityManager){},
    async deleteExtracurricular(activity){},

    async createGradeRanges(gradeData){}// holds grade Enum and lower and upper bounds

};
