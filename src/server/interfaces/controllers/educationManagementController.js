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
 
const educationManagementController = {

    // admin/school
    async createClass(schoolName,schoolID,classAlias,classData){
        return classAdapter.createClass(schoolName,schoolID,classAlias,classData)
    },
    async createSubject(schoolName,schoolID,classAlias,subjectData){
        return subjectAdapter.createSubject(schoolName,schoolID,classAlias,subjectData)
    },
    async getClass(schoolName,schoolID,classAlias){
        return classAdapter.getClass(schoolName,schoolID,classAlias)
    },
    async getSubject(schoolName,schoolID,classAlias,subjectTitle){
        return subjectAdapter.getSubject(schoolName,schoolID,classAlias,subjectTitle)
    },
    async updateClass(schoolName,schoolID,classAlias){
        return classAdapter.updateClass(schoolName,schoolID,classAlias)
    },
    async updateSubject(schoolName,schoolID,classAlias,subjectTitle){
        return subjectAdapter.updateSubject(schoolName,schoolID,classAlias,subjectTitle)
    },
    async removeClass(schoolName,schoolID,classAlias){
        return classAdapter.removeClass(schoolName,schoolID,classAlias)
    },
    async removeSubject(schoolName,schoolID,classAlias,subjectTitle){
        return subjectAdapter.removeSubject(schoolName,schoolID,classAlias,subjectTitle)
    },
    async assignClassTeacher(schoolName,schoolID,classAlias,TeacherID){
        return classAdapter.assignClassTeacher(schoolName,schoolID,classAlias,TeacherID)
    },
    async reassignClassTeacher(schoolName,schoolID,classAlias,TeacherID){
        return classAdapter.removeSubject(schoolName,schoolID,classAlias,TeacherID)
    },

    
    async createActivity(schoolName,schoolID,activityAlias){
        return activityAdapter.createActivity(schoolName,schoolID,activityAlias)
    },
    async getActivity(schoolName,schoolID,activityAlias){
        return activityAdapter.removeSubject(schoolName,schoolID,activityAlias)
    },
    async updateActivity(schoolName,schoolID,activityAlias){
        return activityAdapter.removeClass(schoolName,schoolID,activityAlias)
    },
    async removeActivity(schoolName,schoolID,activityAlias){
        return activityAdapter.removeSubject(schoolName,schoolID,activityAlias)
    },
    async assignActivityTeacher(schoolName,schoolID,activityAlias,TeacherID){
        return activityAdapter.removeClass(schoolName,schoolID,activityAlias,TeacherID)
    },
    async reassignActivityTeacher(schoolName,schoolID,activityAlias,oldTeacherID,newTeacherID){
        return activityAdapter.removeSubject(schoolName,schoolID,activityAlias,oldTeacherID,newTeacherID)
    },

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
    async createclassSequence(schoolName,schoolID){
        return classAdapter.createclassSequence(schoolName,schoolID)
    },
    async createGradeRanges(schoolName,schoolID,gradeData){
        return resultsAdapter.createGradeRanges(schoolName,schoolID,gradeData)
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