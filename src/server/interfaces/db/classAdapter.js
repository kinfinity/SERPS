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
    async createClass(classAlias,classData){

        return classService.createNewClass(classAlias,classData);
    },
    async getClass(classAlias){

        return classService.getClass();
    },
    async updateClass(classAlias){
        return classService.updateClass(classAlias);
    },
    async removeClass(classAlias){
        return classService.removeClass(classAlias);
    },
    async assignClassTeacher(classAlias,TeacherID){
        return classService.assignClassTeacher();
    },

    async createclassSequence(){
        return classService.createclassSequence();
    }

};

export default classAdapter;