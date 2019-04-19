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


import notificationAdapter from '../db/notificationAdapter';

const notificationController = {

    getNotifications(){
        return notificationAdapter.getLatest(); // max=10
    },
    createNotification(Note){
        return notificationAdapter.createNotification(Note);
    },
    updateNotification(noteTitle,noteID,noteImage,noteText){
        return notificationAdapter.update(noteTitle,noteID,noteImage,noteText);
    },
    deleteNotification(noteTitle,noteID){
        return notificationAdapter.delete(noteTitle,noteID);
    }, 
    
};

export default notificationController;