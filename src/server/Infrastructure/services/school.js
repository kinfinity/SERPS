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

import singUpController from '../../interfaces/controllers/signUpController';
import authenticationController from '../../interfaces/controllers/authenticationController';
import documentsController from '../../interfaces/controllers/documentsController';
import timeTableController from '../../interfaces/controllers/timeTableController';
import accountManagementController from '../../interfaces/controllers/accountManagementController';
import paymentManagementController from '../../interfaces/controllers/paymentManagementController';
import profileManagementController from '../../interfaces/controllers/profileManagementController';
import notificationController from '../../interfaces/controllers/notificationController';
import educationManagementController from '../../interfaces/controllers/educationManagementController';

export default {
 
  // Creates a new school in the database
  async signupSchool(params) {

    let payload = null;
    await singUpController.createSchool(params)
    .then((result) => {
        payload = result;
    })
    .catch((err) => {
        console.log(err);
        payload = null;
    });

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
    async getProfileInfo(SchoolName,SchoolID){
      return profileManagementController.getSchoolProfileInfo(SchoolName,SchoolID);
    },
    async getContactInfo(SchoolName,SchoolID){
      return profileManagementController.getSchoolContactInfo(SchoolName,SchoolID);
    },
    async updateContactInfo(contactInfo){
        return profileManagementController.updateSchoolContactInfo(contactInfo);
    },
    async getAddressInfo(SchoolName,SchoolID){
        return profileManagementController.getSchoolAddressInfo(SchoolName,SchoolID);
    },
    async updateAddressInfo(addressInfo){
        return profileManagementController.updateSchoolContactInfo(addressInfo);
    },
    
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
    async validateLectureNote(subject,ClassAlias,lectureNoteID){
      return documentsController.validateLectureNote(subject,ClassAlias,lectureNoteID);
    },
    async getLectureNote(subject,classAlias,lectureNoteID){
        return documentsController.getLectureNote(subject,classAlias,lectureNoteID);
    },
    async getLectureNotes(subject,ClassAlias){
      return documentsController.getLectureNotes(subject,ClassAlias);
    },

    // timetableController
    getClassTimetable(ClassAlias){
      return timeTableController.getClassTimetable(ClassAlias);
    },
    getSubjectTimetable(subjectAlias,Class){
        return timeTableController.getSubjectTimetable(subjectAlias,Class);
    },
    createTimetable(timeTableData){
        return timeTableController.createTimetable(timeTableData); // list or Datastructure [list of lists]
    },
    updateTimetable(ClassAlias,subject,timeSlot){ // timeSlot Enum for class ranges
        return timeTableController.updateTimetable(ClassAlias,subject,timeSlot);
    },
    deleteTimetable(ClassAlias,timeTableID){
        return timeTableController.deleteTimetable(ClassAlias,timeTableID);
    },
    archiveTimetable(ClassAlias,timeTableID){
        return timeTableController.archiveTimetable(ClassAlias,timeTableID);
    },

    // educationManagementController
    async createClass(classAlias,classData){
      return educationManagementController.createClass(classAlias,classData);
    },
    async createSubject(classAlias,subjectData){
        return educationManagementController.createSubject(classAlias,subjectData);
    },
    async getClass(classAlias){
        return educationManagementController.getClass(classAlias);
    },
    async getSubject(classAlias,subjectTitle){
        return educationManagementController.getSubject(classAlias,subjectTitle);
    },
    async updateClass(classAlias){
        return educationManagementController.updateClass(classAlias);
    },
    async updateSubject(classAlias,subjectTitle){
        return educationManagementController.updateSubject(classAlias,subjectTitle);
    },
    async removeClass(classAlias){
        return educationManagementController.removeClass(classAlias);
    },
    async removeSubject(classAlias,subjectTitle){
        return educationManagementController.removeSubject(classAlias,subjectTitle);
    },
    async assignClassTeacher(classAlias,TeacherID){
        return educationManagementController.assignClassTeacher(classAlias,TeacherID);
    },
    async reassignClassTeacher(classAlias,TeacherID){
        return educationManagementController.removeSubject(classAlias,TeacherID);
    },
    async createActivity(activityAlias,activityData){
      return educationManagementController.createActivity(activityAlias,activityData);
    },
    async getActivity(activityAlias){
        return educationManagementController.removeSubject(activityAlias);
    },
    async updateActivity(activityAlias,activityData){
        return educationManagementController.removeClass(activityAlias,activityData);
    },
    async removeActivity(activityAlias){
        return educationManagementController.removeSubject(activityAlias);
    },
    async assignActivityTeacher(activityAlias,TeacherID){
        return educationManagementController.removeClass(activityAlias,TeacherID);
    },
    async reassignActivityTeacher(activityAlias,oldTeacherID,newTeacherID){
        return educationManagementController.removeSubject(activityAlias,oldTeacherID,newTeacherID);
    },

    async viewPendingResults(){
      return educationManagementController.viewPendingResults();
    },
    async validatePendingResult(SubjectID,classAlias){
        return educationManagementController.validatePendingResult(SubjectID,classAlias);
    },

    async viewRegisteredStudents(){
        return educationManagementController.viewRegisteredStudents();
    },
    async viewRegisteredStudent(studentID){
        return educationManagementController.viewRegisteredStudent(studentID);
    },
    async validateRegisteredStudent(studentID){
        return educationManagementController.validateRegisteredStudent(studentID);
    },
    async createclassSequence(){
        return educationManagementController.createclassSequence();
    },
    async createGradeRanges(gradeData){
        return educationManagementController.createGradeRanges(gradeData);
    },// holds grade Enum and lower and upper bounds

};
