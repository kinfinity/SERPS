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


import authorisationService from '../../domains/services/authorisationService'
import schoolAdminService from '../../domains/services/schoolService'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'


const schoolAdminAdapter = {

  // Adds new school to the database
  async persist(params) {

    /**
     *      Name: req.body.Name,
     *      schoolPrefix: req.body.schoolPrefix,
     *      email: req.body.email
     *      password: req.body.password
            motto: req.body.motto,
            Address: req.body.Address,
            Logo: req.body.logoLink,
            Images: [req.body.imagesLinks] // 1-3
     */
    
    let response = null

    await schoolAdminService.createNewEmailUser(
        params.Name,
        params.schoolID,
        params.email,
        params.password,
        params.motto, 
        params.Address, 
        params.Logo,
        params.Images
    ).
    then((result) => {

      // Creation Succeeded
      winstonLogger.info('PERSIST: Result')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((err) => {

      response = null
      
      return Promise.reject(response)

    })

    return response

  },
  // Authenticates already existing user
  async authenticate(email, password, username) {
  
    let response = null

    await schoolAdminService.authenticateUser({email, password, username}).
    then((result) => {

      // Authentication succeeded
      winstonLogger.info('AUTHENTICATION: result')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: authenticating')
      winstonLogger.error(e)

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
        winstonLogger.info('AUTHORISATION: result')
        winstonLogger.info(resolve)

        response = Promise.resolve(resolve)

    }).
    catch((err) => {

      response = {
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data :null
      }

    })

    return response

  },
  // Logout an authenticated user
  async logout(accessToken) {
  
    let response = null

    await schoolAdminService.logoutParent(accessToken).
    then((resolve) => {

      // Lougout succeeded
      winstonLogger.info('LOGOUT: result')
      winstonLogger.info(resolve)
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      response = {
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data :null
      }

    })

    return response

  },

  async getSchoolInfo(schoolName,schoolID){

    let response = null

    await schoolAdminService.getSchoolInfo(schoolName,schoolID).
    then((result) => {

      // 
      winstonLogger.info('GET: schoolInfo')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting schoolInfo')
      winstonLogger.error(e)

      response = {
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data :null
      }

    })

    return response

  },

  async updateSchool(schoolName,schoolID,SchoolData){

    //
    let response = null

    await schoolAdminService.updateSchoolInfo(schoolName,schoolID,SchoolData).
    then((result) => {

      // 
      if(result !== null){

        winstonLogger.info('UPDATE: schoolInfo')
        winstonLogger.info(result)

        response = Promise.resolve(result)
        
      }else{
        response = Promise.resolve(null)
      }
      

    }).
    catch((e) => {

      winstonLogger.error('ERROR: updating schoolInfo')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },
  
  // getSchoolContactInfo
  async getSchoolContactInfo(schoolName,schoolID){

    let response = null

    await schoolAdminService.getSchoolContactInfo(schoolName,schoolID).
    then((result) => {

      // 
      winstonLogger.info('GET: schoolContactInfo')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting schoolData')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },

  async updateSchoolContactInfo(schoolName,schoolID,SchoolData){

    //
    let response = null

    await schoolAdminService.updateSchoolContactInfo(schoolName,schoolID,SchoolData).
    then((result) => {

      // 
      winstonLogger.info('UPDATE: schoolContactInfo')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting schoolContactInfo')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },

  // getSchoolPaymentInfo
  async getSchoolPaymentInfo(schoolName,schoolID){

    let response = null

    await schoolAdminService.getSchoolPaymentInfo(schoolName,schoolID).
    then((result) => {

      // 
      winstonLogger.info('GET: schoolPayemntInfo')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting schoolPaymentInfo')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },
  async updateSchoolPaymentInfo(schoolName,schoolID,SchoolData){

    //
    let response = null

    await schoolAdminService.updateSchoolPaymentInfo(schoolName,schoolID,SchoolData).
    then((result) => {

      // 
      winstonLogger.info('UPDATE: schoolPaymentInfo ')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: updating schoolPaymentInfo')
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

    await schoolAdminService.removeNotification(schoolName,schoolID,notificationID).
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