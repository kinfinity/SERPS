/*
 * #k_infinityIII@Echwood
 *
 * subjectAdapter: ()
 *
 *Functions:
 *  CRUD
 *
 *
 */
import subjectService from '../../domains/services/subjectService'
import schoolService from '../../domains/services/schoolService'
import classService from '../../domains/services/classService'

 
const subjectAdapter = {

    // admin/school
    async createSubjectHolder(schoolName,schoolID,subjectName,subjectDescription){
        return subjectService.createSubjectHolder(schoolName,schoolID,subjectName,subjectDescription)
    },
    async removeSubjectHolder(schoolName,schoolID,subjectName){
        return subjectService.removeSubjectHolder(schoolName,schoolID,subjectName)
    },

    // 
    async addSubjectHoldertoSchool(schoolName,schoolID,subjectName,subjectID){
        return schoolService.addSubjectHolder(schoolName,schoolID,subjectName,subjectID)
    },
    async removeSubjectHolderfromSchool(schoolName,schoolID,subjectName,subjectID){
        return schoolService.removeSubjectHolderfromSchool(schoolName,schoolID,subjectName,subjectID)
    },
    //
    async createSubject(schoolName,schoolID,classAlias,subjectName,subjectData){
        return subjectService.createNewSubject(schoolName,schoolID,classAlias,subjectName,subjectData)
    },
    async removeSubject(schoolName,schoolID,classAlias,subjectName){
        return subjectService.removeSubject(schoolName,schoolID,classAlias,subjectName)
    },
    async getSubject(schoolName,schoolID,classAlias,subjectName){
        return subjectService.getSubject(schoolName,schoolID,classAlias,subjectName)
    },

    //
    async addSubjecttoHolder(schoolName,schoolID,subjectName,subjectID,classAlias){
        return subjectService.addSubjecttoHolder(schoolName,schoolID,subjectName,subjectID,classAlias)
    },
    async removeSubjectfromHolder(schoolName,schoolID,subjectName,subjectID,classAlias){
        return subjectService.removeSubjectfromHolder(schoolName,schoolID,subjectName,subjectID,classAlias)
    },
    //
    async addSubjecttoClass(schoolName, schoolID, subjectName, subjectID, classAlias){
        return classService.addSubjecttoClass(schoolName,schoolID,subjectName,subjectID,classAlias)
    },
    async removeSubjectfromClass(schoolName,schoolID,subjectName,subjectID,classAlias){
        return classService.removeSubjectfromClass(schoolName,schoolID,subjectName,subjectID,classAlias)
    }

}

export default subjectAdapter