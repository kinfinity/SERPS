/*
 * #k_infinityIII@Echwood
 *
 * schoolSessionController: ()
 *
 *Functions:
 *  CRUD
 *
 */

import schoolSessionAdapter from '../db/schoolSessionAdapter'
import schoolAdapter from '../db/schoolAdminAdapter'

const   schoolSessionController = {

    //
    async getSchoolSession(schoolName,schoolID){
        return schoolSessionAdapter.getSchoolSession(schoolName,schoolID)
    },
    async createSchoolSession(schoolName,schoolID,notifications,sessionData){
        return schoolSessionAdapter.createSchoolSession(schoolName,schoolID,notifications,sessionData)
    },
    async updateSchoolSession(schoolName,schoolID,sessionData){
        return schoolSessionAdapter.updateSchoolSession(schoolName,schoolID,sessionData)
    }, 
    async addSession(schoolName,schoolID,sessionID){
        return schoolSessionAdapter.addSession(schoolName,schoolID,sessionID)
    },
    async addNotification(schoolName,schoolID,notificationID){
        return schoolSessionAdapter.addNotification(schoolName,schoolID,notificationID)
    },
    async removeNotification(schoolName,schoolID,notificationID){
        return schoolSessionAdapter.removeNotification(schoolName,schoolID,notificationID)
    },
    async update_AccessCode(schoolName,schoolID,sessionName){
        return schoolSessionAdapter.update_AccessCode(schoolName,schoolID,sessionName)
    },

    async getAdmissionStatus(schoolName,schoolID){
        return schoolAdapter.getAdmissionStatus(schoolName,schoolID)
    },
    async openAdmission(schoolName,schoolID){
        return schoolAdapter.openAdmission(schoolName,schoolID)
    },
    async closeAdmission(schoolName,schoolID){
        return schoolAdapter.closeAdmission(schoolName,schoolID)
    }

}

export default schoolSessionController