/*
 * #k_infinityIII@Echwood
 *
 * classAdapter: ()
 *
 *Functions:
 *  CRUD
 *
 *
 */
import classService from '../../domains/services/classService';
 
const classAdapter = {

    // admin/school
    async createClass(schoolName,schoolID,classAlias,classData){

        return classService.createNewClass(schoolName,schoolID,classAlias,classData);
    },
    async getClass(schoolName,schoolID,classAlias){

        return classService.getClass(schoolName,schoolID,classAlias);
    },
    async updateClass(schoolName,schoolID,classAlias){
        return classService.updateClass(schoolName,schoolID,classAlias);
    },
    async removeClass(schoolName,schoolID,classAlias){
        return classService.removeClass(schoolName,schoolID,classAlias);
    },
    async assignClassTeacher(schoolName,schoolID,classAlias,TeacherID){
        return classService.assignClassTeacher(schoolName,schoolID,classAlias,TeacherID);
    },

    async createclassSequence(schoolName,schoolID){
        return classService.createclassSequence(schoolName,schoolID)
    }

};

export default classAdapter;