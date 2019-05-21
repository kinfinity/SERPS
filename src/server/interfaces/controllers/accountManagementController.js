/*
 * #k_infinityIII@Echwood
 *
 * accountManagementController: ()
 *
 *Functions:
 *  CRUD
 *
 *
 */


import teacherAdapter from '../db/teacherAdapter'
import studentAdapter from '../db/studentAdapter'
 
const accountManagementController = {

    async createTeacher(schoolName,schoolID,teacherData){
        return teacherAdapter.createTeacher(schoolName,schoolID,teacherData)
    },
    async removeTeacher(teacherName,teacherID){
        return teacherAdapter.removeTeacher(schoolName,schoolID,teacherName,teacherID)
    },

    async createStudent(studentData){
        return studentAdapter.createStudent(schoolName,schoolID,studentData)
    },
    async removeStudent(studentName,studentID){
        return studentAdapter.removeStudent(schoolName,schoolID,studentName,studentID)
    },
    async generateParentKey(studentName,studentID){
        return studentAdapter.generateParentKey(schoolName,schoolID,studentName,studentID)
    }

}

export default accountManagementController