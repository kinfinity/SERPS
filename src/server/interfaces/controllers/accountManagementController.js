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


import accountManagementAdapter from '../db/accountManagementAdapter';
 
const accountManagementController = {

    async createTeacher(teacherData){
        return accountManagementAdapter.createTeacher(teacherData);
    },
    async removeTeacher(teacherName,teacherID){
        return accountManagementAdapter.removeTeacher(teacherName,teacherID);
    },

    async createStudent(studentData){
        return accountManagementAdapter.createStudent(studentData);
    },
    async removeStudent(studentName,studentID){
        return accountManagementAdapter.removeStudent(studentName,studentID);
    }

};

export default accountManagementController;