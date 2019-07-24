/*
 * #k_infinityIII@Echwood
 *
 * teacherAdapter: () : provides a layer to interface with the database
 * implementations could be changed to adapt at this layer
 *
 *Functions:
 *
 * sinks teacher data into database
 *
 */


import authorisationService from '../../domains/services/authorisationService'
import teacherService from '../../domains/services/teacherService'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'


const teacherAdapter = {

  // Adds new user to the database with email and password
  async persist(params) {

    winstonLogger.info('PARAMS:')
    winstonLogger.info(JSON.stringify(params,null,4))
    let response = null

    await teacherService.createNewEmailUser(
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

    await teacherService.authenticateUser({email, password}).
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

    await teacherService.logoutTeacher(accessToken).
    then((resolve) => {

      // Lougout succeeded
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      reponse = {'response': false}

    })

    return response

  },


  //
  async assignClassIDtoTeacher(schoolName,schoolID,classAlias,classID,teacherRef){
    return teacherService.assignClassIDtoTeacher(schoolName,schoolID,classAlias,classID,teacherRef) 
  },
  async getTeacherInfo(schoolName,schoolID,teacherName,teacherID){

    let response = null

    await teacherService.getTeacherInfo(schoolName,schoolID,teacherName,teacherID).
    then((resolve) => {

      winstonLogger.info('GET: teacherInfo')
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: geteting teacherInfo')
      winstonLogger.error(e.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: false
      }

    })

    return response
  },
  
  async getTeacherContactInfo(schoolName,schoolID,teacherName,teacherID){

    let response = null

    await teacherService.getTeacherContactInfo(schoolName,schoolID,teacherName,teacherID).
    then((resolve) => {

      winstonLogger.info('GET: teacherContactInfo')
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: geteting teacherContactInfo')
      winstonLogger.error(e.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: false
      }

    })

    return response
  },
  
  async updateTeacherContactInfo(schoolName,schoolID,teacherName,teacherID,contactInfo){

    let response = null

    await teacherService.updateTeacherContactInfo(schoolName,schoolID,teacherName,teacherID,contactInfo).
    then((resolve) => {

      winstonLogger.info('UPDATE: teacherContactInfo')
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: updating teacherContactInfo')
      winstonLogger.error(err.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Data: false
      }

    })

    return response
  },

}

export default teacherAdapter