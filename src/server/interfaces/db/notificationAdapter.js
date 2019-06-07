/*
 * #k_infinityIII@Echwood
 *
 * notificationAdapter: () : provides a layer to interface with the database
 * implementations could be changed to adapt at this layer
 *
 *Functions:
 *
 * sinks Notifications data into database
 *
 */

import notificationService from '../../domains/services/notificationService'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'


const notificationAdapter = {

  // get all notifications 
  async getNotifications(SchoolName,SchoolID) {
    
    let response = null

    await notificationService.getNotifications(
        SchoolName,
        SchoolID
    ).
    then((result) => {

      // get Succeeded
      winstonLogger.info('RESULTS:')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((err) => {

      response = null
      
      return Promise.reject(response)

    })

    return response

  },

  //createNotification
  async createNotification(SchoolName,SchoolID,noteTitle,noteID,noteImage,noteText) {
    
    let response = null

    await notificationService.createNotification(
        SchoolName,
        SchoolID,
        noteTitle,
        noteID,
        noteImage,
        noteText
    ).
    then((result) => {

      // Creation Succeeded
      winstonLogger.info('RESULTS:')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: creating notificationX')
      winstonLogger.error(err)

      response = {
        'statusCode': publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },

  //updateNotification
  async updateNotification(SchoolName,SchoolID,noteID,Data) {
    
    let response = null

    await notificationService.updateNotification(
        SchoolName,
        SchoolID,
        noteID,
        Data
    ).
    then((result) => {

      // update Succeeded
      winstonLogger.info('RESULTS:')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((err) => {

      response = null
      
      return Promise.reject(response)

    })

    return response

  },

  //deleteNotification
  async deleteNotification(SchoolName,SchoolID,noteTitle,noteID) {
    
    let response = null

    await notificationService.deleteNotification(
        SchoolName,
        SchoolID,
        noteTitle,
        noteID
    ).
    then((result) => {

      // delete Succeeded
      winstonLogger.info('RESULTS:')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((err) => {

      response = null
      
      return Promise.reject(response)

    })

    return response

  }
  
}

export default notificationAdapter