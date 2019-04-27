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


import teacherAdapter from '../db/teacherAdapter';
import studentAdapter from '../db/studentAdapter';
 
const accountManagementController = {

    async createTeacher(teacherData){
        //return teacherAdapter.createTeacher(teacherData);
    },
    async removeTeacher(teacherName,teacherID){
        //return teacherAdapter.removeTeacher(teacherName,teacherID);
    },

    async createStudent(studentData){
        //return studentAdapter.createStudent(studentData);
    },
    async removeStudent(studentName,studentID){
        //return studentAdapter.removeStudent(studentName,studentID);
    },
    async generateParentKey(studentName,studentID){
        //return studentAdapter.generateParentKey(studentName,studentID);
    }

};

export default accountManagementController;