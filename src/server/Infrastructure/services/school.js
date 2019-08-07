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
import schoolSessionController from '../../interfaces/controllers/schoolSessionController'
import winstonLogger from '../utils/winstonLogger'
import publicEnums from '../../app/publicEnums'

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
        detail: Data.email,
        password: Data.password
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
    winstonLogger.info(JSON.stringify(params,null,4))
    // Call controller which handles authentication
    await authenticationController.authenticateSchoolAdmin(
      params.detail,
      params.password
    ).
    then((result) => {

      // Succeeded user authentication, prepare to sendout payload
      payload = result

    }).
    catch((err) => {

        winstonLogger.error('ERROR: AUTHENTICATING')
        winstonLogger.error(err.stack)
      // failed authenticating user send errorCode[statusCode] and empty token
      payload = {
          statusCode: '',
           Token :null
      }

    })

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
    async updateContactInfo(shoolName,schoolID,contactInfo){
        return profileManagementController.updateSchoolContactInfo(shoolName,schoolID,contactInfo)
    },
    
    // paymentManagementController
    async getSchoolPaymentInfo(SchoolName,SchoolID){
        return paymentManagementController.getSchoolPaymentInfo(SchoolName,SchoolID)
    },
    async updateSchoolPaymentInfo(SchoolName,schoolID,paymentInfo){
        return paymentManagementController.updateSchoolPaymentInfo(SchoolName,schoolID,paymentInfo)
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
    async createClass(schoolName,schoolID,classAlias,classData){
      return educationManagementController.createClass(schoolName,schoolID,classAlias,classData)
    },
    async createSubjectHolder(schoolName,schoolID,subjctName,subjectDescription){
        return educationManagementController.createSubjectHolder(schoolName,schoolID,subjctName,subjectDescription)
    },
    async removeSubjectHolder(schoolName,schoolID,subjctName){
        return educationManagementController.removeSubjectHolder(schoolName,schoolID,subjctName)
    },
    async createSubject(schoolName,schoolID,classAlias,subjectName,subjectData){
        return educationManagementController.createSubject(schoolName,schoolID,classAlias,subjectName,subjectData)
    },
    async getClass(schoolName, schoolID, classAlias){
        return educationManagementController.getClass(schoolName, schoolID, classAlias)
    },
    async getSubject(schoolName,schoolID,classAlias,subjectName){
        return educationManagementController.getSubject(schoolName,schoolID,classAlias,subjectName)
    },
    async updateClass(schoolName,schoolID,classAlias,classData){
        return educationManagementController.updateClass(schoolName,schoolID,classAlias,classData)
    },
    async updateSubject(classAlias,subjectTitle){
        return educationManagementController.updateSubject(classAlias,subjectTitle)
    },
    async removeClass(schoolName,schoolID,classAlias){
        return educationManagementController.removeClass(schoolName,schoolID,classAlias)
    },
    async removeSubject(schoolName,schoolID,classAlias,subjectName){
        return educationManagementController.removeSubject(schoolName,schoolID,classAlias,subjectName)
    },
    async assignClassTeacher(schoolName,schoolID,classAlias,TeacherID){
        return educationManagementController.assignClassTeacher(schoolName,schoolID,classAlias,TeacherID)
    },
    async reassignClassTeacher(classAlias,TeacherID){
        return educationManagementController.removeSubject(classAlias,TeacherID)
    },

    // Activity
    async createActivity(schoolName,schoolID,activityAlias,activityData){
      return educationManagementController.createActivity(schoolName,schoolID,activityAlias,activityData)
    },
    async getActivity(schoolName,schoolID,activityAlias){
        return educationManagementController.getActivity(schoolName,schoolID,activityAlias)
    },
    async updateActivity(schoolName,schoolID,activityAlias,activityData){
        return educationManagementController.updateActivity(schoolName,schoolID,activityAlias,activityData)
    },
    async removeActivity(schoolName,schoolID,activityAlias){
        return educationManagementController.removeActivity(schoolName,schoolID,activityAlias)
    },
    async assignActivityTeacher(schoolName,schoolID,activityAlias,TeacherID){
        return educationManagementController.assignActivityTeacher(schoolName,schoolID,activityAlias,TeacherID)
    },

    // Results
    async viewPendingResults(){
      return educationManagementController.viewPendingResults()
    },
    async validatePendingResult(SubjectID,classAlias){
        return educationManagementController.validatePendingResult(SubjectID,classAlias)
    },

    // Students
    async viewRegisteredStudents(){
        return educationManagementController.viewRegisteredStudents()
    },
    async viewRegisteredStudent(studentID){
        return educationManagementController.viewRegisteredStudent(studentID)
    },
    async validateRegisteredStudent(studentID){
        return educationManagementController.validateRegisteredStudent(studentID)
    },

    //schoolSessionController
    async activateNextTerm(schoolName,schoolID,TermData){
        return schoolSessionController.activateNextTerm(schoolName,schoolID,TermData)
    },
    async updateSchoolSession(schoolName,schoolID,sessionData){
        return schoolSessionController.updateSchoolSession(schoolName,schoolID,sessionData)
    },
    async getSchoolSession(schoolName,schoolID){
        return schoolSessionController.getSchoolSession(schoolName,schoolID)
    },
    async createSchoolSession(schoolName,schoolID,notifications,sessionData){
        return schoolSessionController.createSchoolSession(schoolName,schoolID,notifications,sessionData)
    },

    // 
    async getAdmissionStatus(schoolName,schoolID){
        return schoolSessionController.getAdmissionStatus(schoolName,schoolID)
    },
    async openAdmission(schoolName,schoolID,publicIdentifier){
        return schoolSessionController.openAdmission(schoolName,schoolID,publicIdentifier)
    },
    async closeAdmission(schoolName,schoolID){
        return schoolSessionController.closeAdmission(schoolName,schoolID)
    }

}
