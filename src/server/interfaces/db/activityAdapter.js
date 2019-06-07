/*
 * #k_infinityIII@Echwood
 *
 * activityAdapter: ()
 *
 *Functions:
 *  CRUD
 *
 *
 */
import activityService from '../../domains/services/activityService'
import schoolService from '../../domains/services/schoolService'
import teacherService from '../../domains/services/teacherService'
 
const activityAdapter = {

    // admin/school
    async createActivity(schoolName,schoolID,activityAlias,activityData){
        return activityService.createNewActivity(schoolName,schoolID,activityAlias,activityData)
    },
    async getActivity(schoolName,schoolID,activityAlias){
        return activityService.getActivity(schoolName,schoolID,activityAlias)
    },
    async updateActivity(schoolName,schoolID,activityAlias,activityData){
        return activityService.updateActivity(schoolName,schoolID,activityAlias,activityData)
    },
    async removeActivity(schoolName,schoolID,activityAlias){
        return activityService.removeActivity(schoolName,schoolID,activityAlias)
    },
    async assignActivityTeacher(schoolName,schoolID,activityAlias,TeacherID){
        return activityService.assignActivityTeacher(schoolName,schoolID,activityAlias,TeacherID)
    },

    // -----------
    async removeActivityfromSchool(SchoolName, schoolID, activityAlias, activityID){
        return schoolService.removeActivityfromSchool(SchoolName, schoolID, activityAlias, activityID)
    },
    async addActivitytoSchool(SchoolName, schoolID, activityAlias, activityID){
        return schoolService.addActivitytoSchool(SchoolName, schoolID, activityAlias, activityID)
    },

    // ----------
    async updateActivityTeacher(activityAlias, activityID, teacherRef, oldteacherRef){
        return teacherService.updateActivityTeacher(activityAlias, activityID, teacherRef, oldteacherRef)
    }
    
}

export default activityAdapter