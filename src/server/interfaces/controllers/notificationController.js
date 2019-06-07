/*
 * #k_infinityIII@Echwood
 *
 * notificationController: ()
 *
 *Functions:
 *  CRUD
 *
 *
 */


import notificationAdapter from '../db/notificationAdapter'

const notificationController = {

    getNotifications(SchoolName,SchoolID){
        return notificationAdapter.getNotifications(SchoolName,SchoolID) // max=10
    },
    createNotification(SchoolName,SchoolID,noteTitle,noteID,noteImage,noteText){
        return notificationAdapter.createNotification(SchoolName,SchoolID,noteTitle,noteID,noteImage,noteText)
    },
    updateNotification(SchoolName,SchoolID,noteID,Data){
        return notificationAdapter.updateNotification(SchoolName,SchoolID,noteID,Data)
    },
    deleteNotification(SchoolName,SchoolID,noteTitle,noteID){
        return notificationAdapter.deleteNotification(SchoolName,SchoolID,noteTitle,noteID)
    }, 
    
}

export default notificationController