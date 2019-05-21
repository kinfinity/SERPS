/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * notificationService: () : NotificationModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *
 */

 import NotificationModel from '../models/notificationModel'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'
import schoolEvent from '../../interfaces/Events/schoolEvents'
import schoolSessionService from './schoolSessionService'



const notificationService = {

  // handle for the NotificationModel
  _notificationModel: NotificationModel,
  
  // getAll
  async getNotifications(SchoolName,SchoolID) {

    winstonLogger.info('::notificationService')

    // Holds return data for this fucntion
    let response = null

    // get the notifications
    await schoolSessionService.getNotifications(SchoolName,SchoolID).
    then((notifications) => {

      winstonLogger.info('GET: notifications')
      response = notifications
      winstonLogger.info(response)
    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting notifications')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    })
    
    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: response
    })

  },
  //
  // getAll
  async getLatestNotification(SchoolName,SchoolID) {

    winstonLogger.info('::notificationService')

    // Holds return data for this fucntion
    let response = null

    // get the notifications
    await schoolSessionService.getLatestNotification(SchoolName,SchoolID).
    then((notifications) => {

      // Get data from DB
      if(notifications) {

        winstonLogger.info('GET: latest notification')
        response = notifications
        winstonLogger.info(response)
        
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting notifications')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    })
    
    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: response
    })
    
    return response

  },

  //
  async createNotification(SchoolName,SchoolID,noteTitle,noteID,noteImage,noteText) {

    winstonLogger.info('::notificationService')

    // Holds return data for this fucntion
    let response,notificationID = null

    //create Notification Document
    await notificationService._notificationModel.save({
      SchoolName,
      SchoolID,
      noteTitle,
      noteID,
      noteImages: noteImage,
      noteText
    }).
    then((notification) => {

      winstonLogger.info('CREATE: notification')
      winstonLogger.info(notification)

      notificationID = ObjectId(notification._id)
      
    }).
    catch((e) => {

      winstonLogger.error('ERROR: creating notification')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    }) 

    // fire event with notificationID as param to save objectID to school document
    schoolEvent.
    emit(
        'school-notificationCreated',
        {
          SchoolName,
          schoolID,
          notificationID
        }
      )// send a few params


    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: notificationID
    })// return objectId

  },

  //updateNotification
  async updateNotification(SchoolName,SchoolID,noteID,Data) {

    winstonLogger.info('::notificationService')

    const options = {
      new: true
    }

    //create Notification Document
    await notificationService._notificationModel.
    findOneAndUpdate({
      SchoolName,
      SchoolID,
      notificationID: noteID,
      },
      Data,
      options
    ).
    then((notification) => {

      winstonLogger.info('UPDATE: notification')
      winstonLogger.info(notification)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: udpating notification')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    }) 

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: true
    })// return objectId

  },

  //SchoolName,SchoolID,noteTitle,noteID
  async deleteNotification(SchoolName,SchoolID,noteTitle,noteID) {

    winstonLogger.info('::notificationService')

    if (!mongoose.Types.ObjectId.isValid(noteID)){

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    }
    //delete Notification Document
    await notificationService._notificationModel.
    findByIdAndRemove({
      _id: noteID,
      noteTitle
    }).
    then((notification) => {

      winstonLogger.info('DELETE: notification')
      winstonLogger.info(notification)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: deleting notification')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    })

    // remove Objectid from school
    schoolEvent.
    emit(
        'school-notificationDeleted',
        {
          SchoolName,
          SchoolID,
          notificationID
        }
      )// send a few params

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: true
    })

  }

}

export default notificationService