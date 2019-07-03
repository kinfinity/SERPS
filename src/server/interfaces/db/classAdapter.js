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
import classService from '../../domains/services/classService'
import schoolService from '../../domains/services/schoolService'
 
const classAdapter = {

    // admin/school
    async createClass(schoolName,schoolID,classAlias,classData){
        return classService.createNewClass(schoolName,schoolID,classAlias,classData)
    },
    async getClass(schoolName,schoolID,classAlias){
        return classService.getClass(schoolName,schoolID,classAlias)
    },
    async updateClass(schoolName,schoolID,classAlias,classData){
        return classService.updateClass(schoolName,schoolID,classAlias,classData)
    },
    async removeClass(schoolName,schoolID,classAlias){
        return classService.removeClass(schoolName,schoolID,classAlias)
    },
    async assignClassTeacher(schoolName,schoolID,classAlias,TeacherID){
        return classService.assignClassTeacher(schoolName,schoolID,classAlias,TeacherID)
    },

    async removeClassfromSchool(schoolName,schoolID,classData){
        return schoolService.removeClassfromSchool(schoolName,schoolID,classData)
    },
    async addClasstoSchool(SchoolName,SchoolID,classData){
        return schoolService.addClasstoSchool(SchoolName,SchoolID,classData)
    },
    async addtimeTable(schoolName,schoolID,classAlias,timeTableID){
        return classService.addtimeTable(schoolName,schoolID,classAlias,timeTableID)
    }
    
}

export default classAdapter