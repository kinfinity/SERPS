/*
 * #k_infinityIII@Echwood
 *
 * parentAdapter: () : provides a layer to interface with the database
 * implementations could be changed to adapt at this layer
 *
 *Functions:
 *
 * sinks parent data into database
 *
 */


import authorisationService from '../../domains/services/authorisationService'
import parentService from '../../domains/services/parentService'
import publicEnums from '../../app/publicEnums';
import winstonLogger from '../../Infrastructure/utils/winstonLogger'

const parentAdapter = {

  // Adds new user to the database with email and password
  async persist(params) {

      winstonLogger.info('PARAMS:')
      winstonLogger.info(JSON.stringify(params,null,4))
      let response = null
  
      await parentService.createNewEmailUser(
        params.schoolName,
        params.Name,
        params.birthDate,
        params.email,
        params.password,
        params.gender,
        params.Address
      ).
      then((result) => {
  
        // Creation Succeeded
        winstonLogger.info('PERSIST: Result')
        winstonLogger.info(JSON.stringify(result,null,4))
  
        response = Promise.resolve(result)
  
      }).
      catch((err) => {
  
        winstonLogger.error('ERROR: persisting data')
        winstonLogger.error(err.stack)
  
        response = null
        return Promise.reject(response)
  
      })
  
      return response

  },
  // Authenticates already existing user
  async authenticate(email, password) {
  
    let response = null

    await parentService.authenticateUser({email, password}).
    then((result) => {

      // Authentication succeeded
      winstonLogger.info('AUTHENTICATION: result')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: authenticating')
      winstonLogger.error(err.stack)

      response = {
        'statusCode': publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        'Token':null
      }

    })

    return response

  },
  // authorise an authenticated user
  async authorise(accessToken) {
  
    let response = null

    // 
    await authorisationService.authoriseToken(accessToken).
    then((resolve) => {

      // Authorization succeeded
        response = Promise.resolve(resolve)

    }).
    catch((err) => {

      response = {'result': false}

    })

    return response

  },
  // Logout an authenticated user
  async logout(accessToken) {
  
    let response = null

    await parentService.logoutParent(accessToken).
    then((resolve) => {

      // Lougout succeeded
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: logging out')
      winstonLogger.error(e.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: false
      }

    })

    return response

  },

  async getPersonalInfo(parentID){

    let response = null

    await parentService.getPersonalInfoByID(parentID).
    then((resolve) => {

      winstonLogger.info('GET: parentInfo by ID')
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: geteting parentInfo by ID')
      winstonLogger.error(e.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: false
      }

    })

    return response
  },

  async getParentInfo(parentName,parentID){

    let response = null

    await parentService.getParentInfo(parentName,parentID).
    then((resolve) => {

      winstonLogger.info('GET: parentInfo')
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: geteting parentInfo')
      winstonLogger.error(e.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: false
      }

    })

    return response
  },

  async getParentContactInfo(parentName,parentID){

    let response = null

    await parentService.getParentContactInfo(parentName,parentID).
    then((resolve) => {

      winstonLogger.info('GET: parentContactInfo')
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: geteting parentContactInfo')
      winstonLogger.error(e.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: false
      }

    })

    return response
  },
  
  async updateParentContactInfo(parentName,parentID,contactInfo){

    let response = null

    await parentService.updateParentContactInfo(parentName,parentID,contactInfo).
    then((resolve) => {

      winstonLogger.info('UPDATE: parentContactInfo')
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: updating parentContactInfo')
      winstonLogger.error(err.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: false
      }

    })

    return response
  },

  async getChildrenInfo(parentName,parentID){

    let response = null

    await parentService.getChildrenInfo(parentName,parentID).
    then((resolve) => {

      winstonLogger.info('UPDATE: parentContactInfo')
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: updating parentContactInfo')
      winstonLogger.error(err.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: false
      }

    })

    return response
  },

}

export default parentAdapter