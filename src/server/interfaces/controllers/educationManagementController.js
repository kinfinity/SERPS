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


import classAdapter from '../db/classAdapter';
import subjectAdapter from '../db/subjectAdapter';
import activityAdapter from '../db/activityAdapter';
import resultsAdapter from '../db/resultsAdapter';
import attendanceAdapter from '../db/attendanceAdapter';
import studentAdapter from '../db/studentAdapter';
 
const educationManagementController = {

    // admin/school
    async createClass(classAlias,classData){
        return classAdapter.createClass(classAlias,classData);
    },
    async createSubject(classAlias,subjectData){
        return subjectAdapter.createSubject(classAlias,subjectData);
    },
    async getClass(classAlias){
        return classAdapter.getClass(classAlias);
    },
    async getSubject(classAlias,subjectTitle){
        return subjectAdapter.getSubject(classAlias,subjectTitle);
    },
    async updateClass(classAlias){
        return classAdapter.updateClass(classAlias);
    },
    async updateSubject(classAlias,subjectTitle){
        return subjectAdapter.updateSubject(classAlias,subjectTitle);
    },
    async removeClass(classAlias){
        return classAdapter.removeClass(classAlias);
    },
    async removeSubject(classAlias,subjectTitle){
        return subjectAdapter.removeSubject(classAlias,subjectTitle);
    },
    async assignClassTeacher(classAlias,TeacherID){
        return classAdapter.assignClassTeacher(classAlias,TeacherID);
    },
    async reassignClassTeacher(classAlias,TeacherID){
        return classAdapter.removeSubject(classAlias,TeacherID);
    },

    
    async createActivity(activityAlias){
        return activityAdapter.createActivity(activityAlias);
    },
    async getActivity(activityAlias){
        return activityAdapter.removeSubject(activityAlias);
    },
    async updateActivity(activityAlias){
        return activityAdapter.removeClass(activityAlias);
    },
    async removeActivity(activityAlias){
        return activityAdapter.removeSubject(activityAlias);
    },
    async assignActivityTeacher(activityAlias,TeacherID){
        return activityAdapter.removeClass(activityAlias,TeacherID);
    },
    async reassignActivityTeacher(activityAlias,oldTeacherID,newTeacherID){
        return activityAdapter.removeSubject(activityAlias,oldTeacherID,newTeacherID);
    },

    async viewPendingResults(){
        return resultsAdapter.viewPendingResults();
    },
    async validatePendingResult(SubjectID,classAlias){
        return resultsAdapter.validatePendingResult(SubjectID,classAlias);
    },

    async viewRegisteredStudents(){
        return studentAdapter.viewRegisteredStudents();
    },
    async viewRegisteredStudent(studentID){
        return studentAdapter.viewRegisteredStudent(studentID);
    },
    async validateRegisteredStudent(studentID){
        return studentAdapter.validateRegisteredStudent(studentID);
    },
    async createclassSequence(){
        return classAdapter.createclassSequence();
    },
    async createGradeRanges(gradeData){
        return resultsAdapter.createGradeRanges(gradeData);
    },



    // teacher
    async getTeacherActivity(teacherID){
        return activityAdapter.getTeacherActivity(teacherID);
    },
    async createTeacherActivityNotification(activityAlias,teacherID){
        return activityAdapter.createTeacherActivityNotification(activityAlias,teacherID);
    },
    async getTeacherActivityNotification(TeacherID,activityAlias){
        return activityAdapter.getTeacherActivityNotification(TeacherID,activityAlias);
    },
    async updateTeacherActivityNotification(TeacherID,activityAlias){
        return activityAdapter.updateTeacherActivityNotification(TeacherID,activityAlias);
    },
    async createSubjectResult(TeacherID,classAlias,subjectAlias,ResultData){
        return resultsAdapter.createStudentSubjectResult(TeacherID,classAlias,subjectAlias,ResultData);
    },
    async getSubjectResult(TeacherID,classAlias,subjectAlias,ResultData){
        return resultsAdapter.getSubjectResult(TeacherID,classAlias,subjectAlias,ResultData);
    },
    async removeSubjectResult(TeacherID,classAlias,subjectAlias,ResultData){
        return resultsAdapter.removeSubjectResult(TeacherID,classAlias,subjectAlias,ResultData);
    },
    async updateSubjectResult(TeacherID,classAlias,subjectAlias,ResultData){
        return resultsAdapter.updateSubjectResult(TeacherID,classAlias);
    },
    async getStudentResults(TeacherID,classAlias,studentID){
        return resultsAdapter.getStudentResults(TeacherID,classAlias,studentID);
    },
    async updateAttendance(subjectAlias,classAlias,attendanceData){
        return attendanceAdapter.updateAttendance(subjectAlias,classAlias,attendanceData);
    },

    // student x parents
    async getAttendance(studentID){
        return attendanceAdapter.getStudentAttendance(studentID);
    },
    async getStudentActivities(studentID){
        return activityAdapter.getStudentActivities(studentID);
    },
    async getActivityNotification(activityAlias){
        return activityAdapter.getActivityNotification(activityAlias);
    },
    async getStudentResults(studentID){
        return resultsAdapter.getStudentResults(studentID);
    }

};

export default educationManagementController;