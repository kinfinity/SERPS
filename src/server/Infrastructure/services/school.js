/*
 * Created by k_infinity3 <ksupro1@gmail.com>
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

import singUpController from '../../interfaces/controllers/signUpController'
import authenticationController from '../../interfaces/controllers/authenticationController'
import documentsController from '../../interfaces/controllers/documentsController'
import timeTableController from '../../interfaces/controllers/timeTableController'
import accountManagementController from '../../interfaces/controllers/accountManagementController'
import paymentManagementController from '../../interfaces/controllers/paymentManagementController'
import profileManagementController from '../../interfaces/controllers/profileManagementController'
import notificationController from '../../interfaces/controllers/notificationController'
import educationManagementController from '../../interfaces/controllers/educationManagementController'
import winstonLogger from '../utils/winstonLogger'
import schoolSessionController from '../../interfaces/controllers/schoolSessionController';
import publicEnums from '../../app/publicEnums';

export default {
 
  // Creates a new school in the database
  async signupSchool(params) {

    winstonLogger.info('SIGNUP')
    // create school
    let payload,Data = null
    await singUpController.createSchool(params)
    .then((result) => {

        winstonLogger.info("aquiring SIGNUP DATA")
        winstonLogger.info(result)
        Data = result

    })
    .catch((err) => {
        winstonLogger.error('signup Error')
        winstonLogger.error(err)
    })

    if(Data == null){

        return payload = {
            status: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Token: null
        }

    }
    // done with SIGNUP

    let payloadA = null
    // authenticate school -> creates token
     await this.authenticate({
        email: Data.email,
        password: Data.password,
        username: Data.username || null
    }).then((result) => payloadA = result)
    .catch((err) => {

        winstonLogger.error('ERROR: authentication')
        winstonLogger.error(err)

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
    await authenticationController.authenticateSchoolAdmin(
      params.email,
      params.password,
      params.username
    ).
    then((result) => {

      // Succeeded user authentication, prepare to sendout payload
      payload = result

    }).
    catch((err) => {


      // failed authenticating user send errorCode[statusCode] and empty token
      payload = {
          statusCode: '',
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
    await authenticationController.logoutSchoolAdmin(params.Token).
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
      return accountManagementController.createTeacher(teacherData)
    },
    async removeStudent(studentName,studentID){
      return accountManagementController.removeStudent(studentName,studentID)
    },
    async createStudent(studentData){
        return accountManagementController.createStudent(studentData)
    },
    async removeTeacher(teacherName,teacherID){
        return accountManagementController.removeTeacher(teacherName,teacherID)
    },
    // profileManagementController
    async getTeacherInfo(teacherName,teacherID){
      return profileManagementController.getTeacherInfo(teacherName,teacherID)
    },
    async getStudentInfo(studentName,studentID){
        return profileManagementController.getStudentInfo(studentName,studentID)
    },
    async getParentInfo(ParentAlias){
        return profileManagementController.getParentInfo(ParentAlias)
    },
    async getProfileInfo(SchoolName,SchoolID){
      return profileManagementController.getSchoolInfo(SchoolName,SchoolID)
    },
    async getContactInfo(SchoolName,SchoolID){
      return profileManagementController.getSchoolContactInfo(SchoolName,SchoolID)
    },
    async updateContactInfo(contactInfo){
        return profileManagementController.updateSchoolContactInfo(contactInfo)
    },
    
    // paymentManagementController
    async getSchoolPaymentInfo(SchoolName,SchoolID){
        return paymentManagementController.getSchoolPaymentInfo(SchoolName,SchoolID)
    },
    async updateSchoolPaymentInfo(SchoolName,schoolID,PaymentInfoData){
        return paymentManagementController.updateSchoolPaymentInfo(SchoolName,schoolID,PaymentInfoData)
    },
    async viewSchoolPaymentTransactionHistory(SchoolName,SchoolID){// TransactionID month teacher bank[Teacher] accNo Receipt/Amount
        return paymentManagementController.viewSchoolPaymentTransactionHistory(SchoolName,SchoolID) 
    },

    // notificationController
    getNotifications(SchoolName,SchoolID){
      return notificationController.getNotifications(SchoolName,SchoolID) // max=10
    },
    createNotification(SchoolName,SchoolID,noteTitle,noteID,noteImage,noteText){
        return notificationController.createNotification(SchoolName,SchoolID,noteTitle,noteID,noteImage,noteText)
    },
    updateNotification(SchoolName,SchoolID,noteID,Data){
        return notificationController.updateNotification(SchoolName,SchoolID,noteID,Data)
    },
    deleteNotification(SchoolName,SchoolID,noteTitle,noteID){
        return notificationController.deleteNotification(SchoolName,SchoolID,noteTitle,noteID)
    },

    // documentsController
    async validateLectureNote(subject,ClassAlias,lectureNoteID){
      return documentsController.validateLectureNote(subject,ClassAlias,lectureNoteID)
    },
    async getLectureNote(subject,classAlias,lectureNoteID){
        return documentsController.getLectureNote(subject,classAlias,lectureNoteID)
    },
    async getLectureNotes(subject,ClassAlias){
      return documentsController.getLectureNotes(subject,ClassAlias)
    },

    // timetableController
    getClassTimetable(schoolName,schoolID,ClassAlias){
      return timeTableController.getClassTimetable(schoolName,schoolID,ClassAlias)
    },
    getSubjectTimetable(schoolName,schoolID,subjectAlias,Class){
        return timeTableController.getSubjectTimetable(schoolName,schoolID,subjectAlias,Class)
    },
    createTimetable(schoolName,schoolID,classAlias,timeTableData){
        return timeTableController.createTimetable(schoolName,schoolID,classAlias,timeTableData) // list or Datastructure [list of lists]
    },
    updateTimetable(schoolName,schoolID,ClassAlias,subject,timeSlot){ // timeSlot Enum for class ranges
        return timeTableController.updateTimetable(schoolName,schoolID,ClassAlias,subject,timeSlot)
    },
    deleteTimetable(schoolName,schoolID,ClassAlias,timeTableID){
        return timeTableController.deleteTimetable(schoolName,schoolID,ClassAlias,timeTableID)
    },
    archiveTimetable(schoolName,schoolID,ClassAlias,timeTableID){
        return timeTableController.archiveTimetable(schoolName,schoolID,ClassAlias,timeTableID)
    },
    // educationManagementController
    async createClass(classAlias,classData){
      return educationManagementController.createClass(classAlias,classData)
    },
    async createSubject(classAlias,subjectData){
        return educationManagementController.createSubject(classAlias,subjectData)
    },
    async getClass(classAlias){
        return educationManagementController.getClass(classAlias)
    },
    async getSubject(classAlias,subjectTitle){
        return educationManagementController.getSubject(classAlias,subjectTitle)
    },
    async updateClass(classAlias){
        return educationManagementController.updateClass(classAlias)
    },
    async updateSubject(classAlias,subjectTitle){
        return educationManagementController.updateSubject(classAlias,subjectTitle)
    },
    async removeClass(classAlias){
        return educationManagementController.removeClass(classAlias)
    },
    async removeSubject(classAlias,subjectTitle){
        return educationManagementController.removeSubject(classAlias,subjectTitle)
    },
    async assignClassTeacher(classAlias,TeacherID){
        return educationManagementController.assignClassTeacher(classAlias,TeacherID)
    },
    async reassignClassTeacher(classAlias,TeacherID){
        return educationManagementController.removeSubject(classAlias,TeacherID)
    },
    async createActivity(activityAlias,activityData){
      return educationManagementController.createActivity(activityAlias,activityData)
    },
    async getActivity(activityAlias){
        return educationManagementController.removeSubject(activityAlias)
    },
    async updateActivity(activityAlias,activityData){
        return educationManagementController.removeClass(activityAlias,activityData)
    },
    async removeActivity(activityAlias){
        return educationManagementController.removeSubject(activityAlias)
    },
    async assignActivityTeacher(activityAlias,TeacherID){
        return educationManagementController.removeClass(activityAlias,TeacherID)
    },
    async reassignActivityTeacher(activityAlias,oldTeacherID,newTeacherID){
        return educationManagementController.removeSubject(activityAlias,oldTeacherID,newTeacherID)
    },

    async viewPendingResults(){
      return educationManagementController.viewPendingResults()
    },
    async validatePendingResult(SubjectID,classAlias){
        return educationManagementController.validatePendingResult(SubjectID,classAlias)
    },

    async viewRegisteredStudents(){
        return educationManagementController.viewRegisteredStudents()
    },
    async viewRegisteredStudent(studentID){
        return educationManagementController.viewRegisteredStudent(studentID)
    },
    async validateRegisteredStudent(studentID){
        return educationManagementController.validateRegisteredStudent(studentID)
    },
    async createclassSequence(){
        return educationManagementController.createclassSequence()
    },
    async createGradeRanges(gradeData){
        return educationManagementController.createGradeRanges(gradeData)
    },// holds grade Enum and lower and upper bounds


    //schoolSessionController
    async activateNextTerm(schoolName,schoolID,TermData){
        return schoolSessionController.activateNextTerm(schoolName,schoolID,TermData)
    },
    async createSchoolSession(schoolName,schoolID,sessionData){
        return schoolSessionController.createSchoolSession(schoolName,schoolID,sessionData)
    }

}
