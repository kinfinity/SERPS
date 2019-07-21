/*
 * #k_infinityIII@Echwood
 *
 * studentAdapter: () : provides a layer to interface with the database
 * implementations could be changed to adapt at this layer
 *
 *Functions:
 *
 * sinks student data into database
 *
 */


import authorisationService from '../../domains/services/authorisationService'
import studentService from '../../domains/services/studentService'
import publicEnums from '../../app/publicEnums'
import winstonLogger from '../../Infrastructure/utils/winstonLogger';


const studentAdapter = {

  // Adds new user to the database with email and password
  async persist(params) {

    winstonLogger.info('PARAMS:')
    winstonLogger.info(JSON.stringify(params,null,4))
    let response = null

    await studentService.createNewEmailUser(
      params.schoolName,
      params.publicIdentifier,
      params.Name,
      params.gender,
      params.birthDate,
      params.email,
      params.password,
      params.classAlias
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

    await studentService.authenticateUser({email, password}).
    then((result) => {

      // Authentication succeeded
      winstonLogger.info('AUTHENTICATION: result')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((err) => {

      winstonLogger.error('ERROR: authenticating')
      winstonLogger.error(e.stack)

      response = {
        'statusCode': publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        'Token':null
      }

    })

    return response

  },
  
  // Logout an authenticated user
  async logout(accessToken) {
  
    let response = null

    await studentService.logoutStudent(accessToken).
    then((resolve) => {

      // Lougout succeeded
      response = Promise.resolve(resolve)

    }).
    catch((err) => {

      reponse = {'response': false}

    })

    return response

  },
   // authorise an authenticated user
   async authorise(accessToken) {
  
    let response = null
    // 
    await authorisationService.authoriseToken(accessToken).
    then((resolve) => {

        // Authorization done
        winstonLogger.info('Authorising:')
        winstonLogger.info(JSON.stringify(resolve,null,4))

        //check contents of token
        if(resolve){

          response = resolve

        }


    }).
    catch((err) => {

      winstonLogger.error('ERROR:')
      winstonLogger.error(err.stack)
      winstonLogger.error(err.message)
      response = {
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data :null
      }

    })

    return Promise.resolve(response)

  },
  //  
  async getStudentPersonalInfo(schoolName,fullName,studentID) {
  
    let response = null
    //
    await studentService.getStudentPersonalInfo(schoolName,fullName,studentID).
    then((result) => {

      // 
      winstonLogger.info('GET: studentInfo')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting studentInfo')
      winstonLogger.error(e.stack)

      response = {
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data :null
      }

    })

    return response

  },
  //
  async updateStudent(studentName,studentID,studentData){

    //
    let response = null

    await studentService.updateStudent(studentName,studentID,studentData).
    then((result) => {

      // 
      if(result !== null){

        winstonLogger.info('UPDATE: studentInfo')
        winstonLogger.info(result)

        response = Promise.resolve(result)
        
      }else{
        response = Promise.resolve(null)
      }
      

    }).
    catch((e) => {

      winstonLogger.error('ERROR: updating studentInfo')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },
  
  // getSchoolContactInfo
  async getStudentContactInfo(studentName,studentID){

    let response = null

    await studentService.getStudentContactInfo(studentName,studentID).
    then((result) => {

      // 
      winstonLogger.info('GET: studentContactInfo')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting studentContactInfo')
      winstonLogger.error(e)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },

  async updateStudentContactInfo(schoolName,fullName,studentID,contactInfo){

    //
    let response = null

    await studentService.updateStudentContactInfo(schoolName,fullName,studentID,contactInfo).
    then((result) => {

      // 
      winstonLogger.info('UPDATE: studentContactInfo')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting studentContactInfo')
      winstonLogger.error(e.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },
  async getStudentAcademicInfo(schoolName,fullName,studentID){

    //
    let response = null

    await studentService.getStudentAcademicInfo(schoolName,fullName,studentID).
    then((result) => {

      // 
      winstonLogger.info('GET: studentAcademicInfo')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting studentContactInfo')
      winstonLogger.error(e.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },
  async getGuardianInfo(schoolName,fullName,studentID){

    //
    let response = null

    await studentService.getGuardianInfo(schoolName,fullName,studentID).
    then((result) => {

      // 
      winstonLogger.info('GET: student Guardian')
      winstonLogger.info(JSON.stringify(result,null,4))

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting student Guardian')
      winstonLogger.error(e.stack)

      reponse = {
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      }

    })

    return response

  },
  
  

}

export default studentAdapter