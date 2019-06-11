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


import schoolService from '../../domains/services/schoolService'
import schoolSessionService from '../../domains/services/schoolSessionService'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'



const schoolAdminAdapter = {

    async getSchoolSession(schoolName,schoolID){

    let response = null

    await schoolSessionService.getSchoolSession(schoolName,schoolID).
    then((result) => {

      // 
      winstonLogger.info('GET: xschoolSession')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting schoolSession')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return response

  },
  //
  async createSchoolSession(schoolName,schoolID,notifications,sessionData){

    let response = null

    await schoolSessionService.createSchoolSession(schoolName,schoolID,notifications,sessionData).
    then((result) => {

      // 
      winstonLogger.info('CREATE: xschoolSession')
      winstonLogger.info(JSON.stringify(result,null,4))

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
  async updateSchoolSession(schoolName,schoolID,sessionData){

    let response = null

    await schoolSessionService.updateSchoolSession(schoolName,schoolID,sessionData).
    then((result) => {

      // 
      winstonLogger.info('UPDATE: xschoolSession')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: updating schoolSession')
      winstonLogger.error(e)

      response = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return response

  },
  async addSession(schoolName,schoolID,sessionID){

    let response = null

    await schoolService.addSession(schoolName,schoolID,sessionID).
    then((result) => {

      // 
      winstonLogger.info('ADD: schoolSession')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: adding schoolSession')
      winstonLogger.error(e)

      response = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return response

  },
  //
  async update_AccessCode(schoolName,schoolID,sessionName){

    let response = null

    await schoolSessionService.update_AccessCode(schoolName,schoolID,sessionName).
    then((result) => {

      // 
      winstonLogger.info('UPDATE: schoool AccessCode')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: updating AccessCode')
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

      Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

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
      winstonLogger.info('ADD: notificationID ')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: adding notificationID')
      winstonLogger.error(e)

      response = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return response

  }

}

export default schoolAdminAdapter