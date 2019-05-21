/*
 * #k_infinityIII@Echwood
 *
 * schoolAdminAdapter: () : provides a layer to interface with the database
 * implementations could be changed to adapt at this layer
 *
 *Functions:
 *
 * sinks schoolAdmin data into database
 *
 */


import schoolSessionService from '../../domains/services/schoolSessionService'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'



const schoolAdminAdapter = {

    async createSchoolSession(schoolName,schoolID,sessionData){

    let response = null

    await schoolSessionService.createSchoolSession(schoolName,schoolID,sessionData).
    then((result) => {

      // 
      winstonLogger.info('CREATE: schoolSession')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: creating schoolSession')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return response

  },
  //
  async activateNextTerm(schoolName,schoolID,TermData){

    let response = null

    await schoolSessionService.activateNextTerm(schoolName,schoolID,TermData).
    then((result) => {

      // 
      winstonLogger.info('ACTIVATE: nextTerm')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: creating and activating nextTerm')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return response

  },

  //remove
  async removeNotification(schoolName,schoolID,notificationID){

    //
    let response = null

    await schoolSessionService.removeNotification(schoolName,schoolID,notificationID).
    then((result) => {

      // 
      winstonLogger.info('REMOVE: notification ')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: removing notification')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return response

  },

  //add
  async addNotification(schoolName,schoolID,notificationID){

    //
    let response = null

    await schoolSessionService.addNotification(schoolName,schoolID,notificationID).
    then((result) => {

      // 
      winstonLogger.info('REMOVE:  ')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: removing data')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return response

  }

}

export default schoolAdminAdapter