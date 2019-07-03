/*
 * #k_infinityIII@Echwood
 *
 * educationManagementController: ()
 *
 *Functions:
 *  CRUD
 *
 *
 */


import classAdapter from '../db/classAdapter'
import subjectAdapter from '../db/subjectAdapter'
import activityAdapter from '../db/activityAdapter'
import resultsAdapter from '../db/resultsAdapter'
import attendanceAdapter from '../db/attendanceAdapter'
import studentAdapter from '../db/studentAdapter'
import teacherAdapter from '../db/teacherAdapter'
 
const educationManagementController = {

    // admin/school
    async createClass(schoolName,schoolID,classAlias,classData){
        return classAdapter.createClass(schoolName,schoolID,classAlias,classData)
    },
    async createSubjectHolder(schoolName,schoolID,subjctName,subjectDescription){
        return subjectAdapter.createSubjectHolder(schoolName,schoolID,subjctName,subjectDescription)
    },
    async removeSubjectHolder(schoolName,schoolID,subjctName){
        return subjectAdapter.removeSubjectHolder(schoolName,schoolID,subjctName)
    },
    async createSubject(schoolName,schoolID,classAlias,subjectName,subjectData){
        return subjectAdapter.createSubject(schoolName,schoolID,classAlias,subjectName,subjectData)
    },
    async getClass(schoolName,schoolID,classAlias){
        return classAdapter.getClass(schoolName,schoolID,classAlias)
    },
    async getSubject(schoolName,schoolID,classAlias,subjectName){
        return subjectAdapter.getSubject(schoolName,schoolID,classAlias,subjectName)
    },
    async updateClass(schoolName,schoolID,classAlias,classData){
        return classAdapter.updateClass(schoolName,schoolID,classAlias,classData)
    },
    async updateSubject(schoolName,schoolID,classAlias,subjectTitle){
        return subjectAdapter.updateSubject(schoolName,schoolID,classAlias,subjectTitle)
    },
    async removeClass(schoolName,schoolID,classAlias){
        return classAdapter.removeClass(schoolName,schoolID,classAlias)
    },
    async removeSubject(schoolName,schoolID,classAlias,subjectName){
        return subjectAdapter.removeSubject(schoolName,schoolID,classAlias,subjectName)
    },
    async assignClassTeacher(schoolName,schoolID,classAlias,TeacherID){
        return classAdapter.assignClassTeacher(schoolName,schoolID,classAlias,TeacherID)
    },
    async assignClassIDtoTeacher(schoolName,schoolID,classAlias,classID,teacherRef){
        return teacherAdapter.assignClassIDtoTeacher(schoolName,schoolID,classAlias,classID,teacherRef)
    },
    async addClasstoSchool(SchoolName,SchoolID,classData){
        return classAdapter.addClasstoSchool(SchoolName,SchoolID,classData)
    },
    async removeClassfromSchool(schoolName,schoolID,classData){
        return classAdapter.removeClassfromSchool(schoolName,schoolID,classData)
    },
    async addSubjecttoClass(schoolName, schoolID, subjectName, subjectID, classAlias){
        return subjectAdapter.addSubjecttoClass(schoolName, schoolID, subjectName, subjectID, classAlias)
    },
    async removeSubjectfromClass(schoolName, schoolID, subjectName, subjectID, classAlias){
        return subjectAdapter.removeSubjectfromClass(schoolName, schoolID, subjectName, subjectID, classAlias)
    },
    async addSubjectHoldertoSchool(schoolName, schoolID, subjectName, subjectID){
        return subjectAdapter.addSubjectHoldertoSchool(schoolName, schoolID, subjectName, subjectID)
    },
    async removeSubjectHolderfromSchool(schoolName, schoolID, subjectName, subjectID){
        return subjectAdapter.removeSubjectHolder(schoolName, schoolID, subjectName, subjectID)
    },
    async addSubjecttoHolder(schoolName, schoolID, subjectName, subjectID,classAlias){
        return subjectAdapter.addSubjecttoHolder(schoolName, schoolID, subjectName, subjectID,classAlias)
    },
    async removeSubjectfromHolder(schoolName, schoolID, subjectName, subjectID,classAlias){
        return subjectAdapter.removeSubjectfromHolder(schoolName, schoolID, subjectName, subjectID,classAlias)
    },
    async addtimeTable(schoolName,schoolID,classAlias,timeTableID){
        return classAdapter.addtimeTable(schoolName,schoolID,classAlias,timeTableID)
    },
    
    // Activity
    async createActivity(schoolName,schoolID,activityAlias,activityData){
        return activityAdapter.createActivity(schoolName,schoolID,activityAlias,activityData)
    },
    async getActivity(schoolName,schoolID,activityAlias){
        return activityAdapter.getActivity(schoolName,schoolID,activityAlias)
    },
    async updateActivity(schoolName,schoolID,activityAlias,activityData){
        return activityAdapter.updateActivity(schoolName,schoolID,activityAlias,activityData)
    },
    async removeActivity(schoolName,schoolID,activityAlias){
        return activityAdapter.removeActivity(schoolName,schoolID,activityAlias)
    },
    async assignActivityTeacher(schoolName,schoolID,activityAlias,TeacherID){
        return activityAdapter.assignActivityTeacher(schoolName,schoolID,activityAlias,TeacherID)
    },
    // ----
    async addActivitytoSchool(SchoolName, schoolID, activityAlias, activityID){
        return activityAdapter.addActivitytoSchool(SchoolName, schoolID, activityAlias, activityID)
    },
    async removeActivityfromSchool(SchoolName, schoolID, activityAlias, activityID){
        return activityAdapter.removeActivityfromSchool(SchoolName, schoolID, activityAlias, activityID)
    },
    // ----
    async updateActivityTeacher(activityAlias, activityID, teacherRef, oldteacherRef){
        return activityAdapter.updateActivityTeacher(activityAlias, activityID, teacherRef, oldteacherRef)
    },
    

    // Results
    async viewPendingResults(schoolName,schoolID,){
        return resultsAdapter.viewPendingResults(schoolName,schoolID,)
    },
    async validatePendingResult(SubjectID,schoolName,schoolID,classAlias){
        return resultsAdapter.validatePendingResult(SubjectID,schoolName,schoolID,classAlias)
    },

    async viewRegisteredStudents(schoolName,schoolID){
        return studentAdapter.viewRegisteredStudents(schoolName,schoolID)
    },
    async viewRegisteredStudent(studentID){
        return studentAdapter.viewRegisteredStudent(studentID)
    },
    async validateRegisteredStudent(studentID){
        return studentAdapter.validateRegisteredStudent(studentID)
    },



    // teacher
    async getTeacherActivity(teacherID){
        return activityAdapter.getTeacherActivity(teacherID)
    },
    async createTeacherActivityNotification(schoolName,schoolID,activityAlias,teacherID){
        return activityAdapter.createTeacherActivityNotification(schoolName,schoolID,activityAlias,teacherID)
    },
    async getTeacherActivityNotification(TeacherID,schoolName,schoolID,activityAlias){
        return activityAdapter.getTeacherActivityNotification(TeacherID,schoolName,schoolID,activityAlias)
    },
    async updateTeacherActivityNotification(TeacherID,schoolName,schoolID,activityAlias){
        return activityAdapter.updateTeacherActivityNotification(TeacherID,schoolName,schoolID,activityAlias)
    },
    async createSubjectResult(TeacherID,schoolName,schoolID,classAlias,subjectAlias,ResultData){
        return resultsAdapter.createStudentSubjectResult(TeacherID,schoolName,schoolID,classAlias,subjectAlias,ResultData)
    },
    async getSubjectResult(TeacherID,schoolName,schoolID,classAlias,subjectAlias,ResultData){
        return resultsAdapter.getSubjectResult(TeacherID,schoolName,schoolID,classAlias,subjectAlias,ResultData)
    },
    async removeSubjectResult(TeacherID,schoolName,schoolID,classAlias,subjectAlias,ResultData){
        return resultsAdapter.removeSubjectResult(TeacherID,schoolName,schoolID,classAlias,subjectAlias,ResultData)
    },
    async updateSubjectResult(TeacherID,schoolName,schoolID,classAlias,subjectAlias,ResultData){
        return resultsAdapter.updateSubjectResult(TeacherID,schoolName,schoolID,classAlias)
    },
    async getStudentResults(TeacherID,schoolName,schoolID,classAlias,studentID){
        return resultsAdapter.getStudentResults(TeacherID,schoolName,schoolID,classAlias,studentID)
    },
    async updateAttendance(subjectAlias,schoolName,schoolID,classAlias,attendanceData){
        return attendanceAdapter.updateAttendance(subjectAlias,schoolName,schoolID,classAlias,attendanceData)
    },
    // -----
    async addLectureNoteUrl(schoolName,schoolID,classAlias,teacherID,subjectName,lectureNoteTitle,lectureNoteUrl){
        return teacherAdapter.addLectureNoteUrl(schoolName,schoolID,classAlias,teacherID,subjectName,lectureNoteTitle,lectureNoteUrl)
    },



    // student x parents
    async getAttendance(studentID){
        return attendanceAdapter.getStudentAttendance(studentID)
    },
    async getStudentActivities(studentID){
        return activityAdapter.getStudentActivities(studentID)
    },
    async getActivityNotification(schoolName,schoolID,activityAlias){
        return activityAdapter.getActivityNotification(schoolName,schoolID,activityAlias)
    },
    async getStudentResults(studentID){
        return resultsAdapter.getStudentResults(studentID)
    }

}

export default educationManagementController