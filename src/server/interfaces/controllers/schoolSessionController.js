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

const   schoolSessionController = {

    //
    async createSchoolSession(schoolName,schoolID,sessionData){
        return schoolSessionAdapter.createSchoolSession(schoolName,schoolID,sessionData)
    }, 
    async activateNextTerm(schoolName,schoolID,TermData){
        return schoolSessionAdapter.activateNextTerm(schoolName,schoolID,TermData)
    }, 
    async addNotification(schoolName,schoolID,notificationID){
        return schoolSessionAdapter.addNotification(schoolName,schoolID,notificationID)
    },
    async removeNotification(schoolName,schoolID,notificationID){
        return schoolSessionAdapter.removeNotification(schoolName,schoolID,notificationID)
    }

}

export default schoolSessionController