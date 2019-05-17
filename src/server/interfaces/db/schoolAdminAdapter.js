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
import shortid from 'shortid'
import winstonLogger from '../../Infrastructure/utils/winstonLogger';
import publicEnums from '../../app/publicEnums';


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
      winstonLogger.info('Adapter Result')
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
      winstonLogger.info('authentication result')
      winstonLogger.info(result)
        response = Promise.resolve(result)

    }).
    catch((err) => {

      winstonLogger.error('error authenticating')
      winstonLogger.error(e)

      response = {
        'statusCode': 'SC101',
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

    await schoolAdminService.logoutParent(accessToken).
    then((resolve) => {

      // Lougout succeeded
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      reponse = {'response': false}

    })

    return response

  },

  async getSchoolInfo(schoolName,schoolID){

    let response = null

    await schoolAdminService.getSchoolInfo(schoolName,schoolID).
    then((result) => {

      // 
      winstonLogger.info('schoolInfo')
      winstonLogger.info(result)
      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('Error getting schoolData')
      winstonLogger.error(e)
      reponse = {'response': false}

    })

    return response

  },

  async updateSchool(schoolName,schoolID,SchoolData){

    //
    let response = null

    await schoolAdminService.updateSchoolInfo(schoolName,schoolID,SchoolData).
    then((result) => {

      // 
      winstonLogger.info('schoolInfo UPDATE?:')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('Error getting schoolData')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      }

    })

    return response

  },

}

export default schoolAdminAdapter