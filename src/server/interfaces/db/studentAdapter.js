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


const studentAdapter = {

  // Adds new user to the database with email and password
  async persist(params) {

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
  async authenticate(email, password) {
  
    let response = null

    await studentService.authenticateUser({email, password}).
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
  
  //  
  async getStudentPersonalInfo(studentName,studentID) {
  
    let response = null
    //
    await studentService.getStudentPersonalInfo().
    then((result) => {

      // 
      winstonLogger.info('GET: studentInfo')
      winstonLogger.info(result)

      response = Promise.resolve(result)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting studentInfo')
      winstonLogger.error(e)

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

  async updateStudentContactInfo(studentName,studentID,studentData){

    //
    let response = null

    await studentService.updateStudentContactInfo(studentName,studentID,studentData).
    then((result) => {

      // 
      winstonLogger.info('UPDATE: studentContactInfo')
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

}

export default studentAdapter