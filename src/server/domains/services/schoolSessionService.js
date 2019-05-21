/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * schoolSessionService: () : SchoolSessionModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *
 */

import SchoolSessionModel from '../models/SchoolSessionModel'
import SchoolModel from '../models/schoolModel'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'
import schoolEvent from '../../interfaces/Events/schoolEvents';

const schoolSessionService = {

  // handle for the SchoolSessionModel
  _schoolSessionModel: SchoolSessionModel,
  _schoolModel: SchoolModel,
  
  // getAll
  async getNotifications(SchoolName,SchoolID) {

    winstonLogger.info('::schoolSessionService')

    let response =null, schoolSession = null

    winstonLogger.info('GET: notification')
    winstonLogger.info(JSON.stringify(paymentData,null,4))

    schoolSession = await this.getSchoolSessionID(SchoolName,SchoolID)
    winstonLogger.info(`sessionID: ${schoolSession}`)        
        
        //
    await schoolService._schoolSessionModel.
    findAll({
        _id: schoolSession.sessionObjectID
    }).
    sort({ _id: -1 }).
    limit(10).
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

    winstonLogger.info('::schoolSessionService')

    //
    let response = null,schoolSession = null

    winstonLogger.info('GET: notification')
    winstonLogger.info(JSON.stringify(paymentData,null,4))

    schoolSession = await this.getSchoolSessionID(SchoolName,SchoolID)
    winstonLogger.info(`sessionID: ${schoolSession}`)        
        
        //
    await schoolService._schoolSessionModel.
    findAll({
        _id: schoolSession.sessionObjectID
    }).
    sort({ _id: -1 }).
    limit(10).
    then((notifications) => {

      winstonLogger.info('GET: notifications')
      response = notifications
      winstonLogger.info(response)
    }).
    // sort({ _id: -1 }).
    // limit(10).
    then((Data) => {

      // Get data from DB
      if(Data) {

        winstonLogger.info('GET: latest notification')
        response = Data
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
  async createSchoolSession(SchoolName,SchoolID,sessionData) {

    winstonLogger.info('::schoolSessionService')

    // Holds return data for this fucntion
    let response,schoolSessionID,activeTerm = null

    //create schoolSession Document
    await schoolSessionService._schoolSessionModel.save(sessionData).
    then((schoolSessionData) => {

        if(schoolSessionData === null){
            return Promise.resolve({
                statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
                Data: false
              })
        }
      winstonLogger.info('CREATE: schoolSession')
      winstonLogger.info(schoolSessionData)

      schoolSessionID = ObjectId(schoolSessionData._id)
      activeTerm = schoolSessionData.Terms[0].termTitle
      
    }).
    catch((e) => {

      winstonLogger.error('ERROR: creating schoolSession')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    }) 

    // fire event with schoolSessionID as param to save objectID to school document as current Session
    schoolEvent.
    emit(
        'school-sessionCreated',
        {
          SchoolName,
          schoolID: SchoolID,
          schoolSessionID
        }
    )// send a few params
    
    // fire event with activeTermIndex  as param to save to school document as activeTermIndex
    schoolEvent.
    emit(
        'school-termCreated',
        {
          SchoolName,
          schoolID: SchoolID,
          activeTerm
        }
      )// send a few params


    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: schoolSessionID
    })// return objectId

  },
  async activateNextTerm(SchoolName,SchoolID,TermData){// or create new term
    
    let schoolSession = null

    const options = {
        new: true
    }

    schoolSession = await this.getSchoolSessionID(SchoolName,SchoolID)
    winstonLogger.info(`sessionID: ${JSON.stringify(schoolSession,null,4)}`)

    await schoolSessionService._schoolSessionModel.
    findOneAndUpdate({
        _id: schoolSession.sessionObjectID
        },{
            $push: {Terms: TermData}
        },
        options
    ).
    then((schoolSessionData) => {

        if(schoolSessionData === null){
            return Promise.resolve({
                statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
                Data: false
              })
        }
      winstonLogger.info('CREATE: new schoolTerm')
      winstonLogger.info(schoolSessionData)

    }).
    catch((e) => {

      winstonLogger.error('ERROR: creating schoolTerm')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    }) 

    // fire event with activeTermIndex  as param to save to school document as activeTermIndex
    schoolEvent.
    emit(
        'school-termCreated',
        {
          SchoolName,
          schoolID: SchoolID,
          activeTerm:termData.termTitle
        }
      )// send a few params

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: true
      })

  },

  //updateNotification
  async updateSchoolSession(SchoolName,SchoolID,sessionData) {

    winstonLogger.info('::schoolSessionService')

    let schoolSession = null

    const options = {
      new: true
    }

    schoolSession = await this.getSchoolSessionID(SchoolName,SchoolID)
    winstonLogger.info(`sessionID: ${schoolSession}`)
    
    // query and update schoolsesion document
    await schoolSessionService._schoolSessionModel.
    findOneAndUpdate({
        _id: schoolSession.sessionObjectID
        },
        sessionData,
        options
    ).
    then((xsessionData) => {

        if(xsessionData === null ){
            return Promise.resolve({
                statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
                Data: false
              })
        }

        winstonLogger.info('UPDATE: schoolSession')
        winstonLogger.info(xsessionData) 

    }).
    catch((e) => {

      winstonLogger.error('ERROR: updating schoolSession')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: null
      })

    }) 


    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: true
    })

  },

  async getSchoolSessionID(SchoolName,SchoolID){

    let sessionObjectID = null ,activeTerm = null

    // get the current schoolsessionID from the schoool document
    await schoolSessionService._schoolModel.
    findOne({
      Name: SchoolName,
      schoolID: SchoolID
    }).
    then((schoolInfo) => {

        winstonLogger.info('GET: current sessionID')
        winstonLogger.info(schoolInfo.currentSessionID)
        winstonLogger.info('GET: activeTerm')
        winstonLogger.info(schoolInfo.activeTerm)
        sessionObjectID = schoolInfo.currentSessionID 
        activeTerm = schoolInfo.activeTerm

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting sessionID')
      winstonLogger.error(e)

      return Promise.resolve(null)

    })

    return Promise.resolve({sessionObjectID,activeTerm})
    
  },
  
    //remove
    async removeNotification(schoolName,schoolID,notificationID){

        //
        let schoolSession = null

        const options = {
          new: true,
          safe: true, 
          upsert: true
        }
  
        winstonLogger.info('ADD: notification')
        winstonLogger.info(JSON.stringify(paymentData,null,4))

        schoolSession = await this.getSchoolSessionID(schoolName,schoolID)
        winstonLogger.info(`sessionID: ${schoolSession}`)        
        
        //
        await schoolService._schoolSessionModel.
        findOneAndUpdate({
            _id: schoolSession.sessionObjectID
          },
          {
            $pull: {'Terms[schoolSession.activeTerm].notifications': notificationID} // REVIEW
          },
          options
        ).
        then((result) => {
  
          winstonLogger.info('RESULT: remove notification ')
          winstonLogger.info(result)
          res = result
  
        }).
        catch((e) => {
  
          winstonLogger.error('ERROR: removing notification from school')
          winstonLogger.error(e)
  
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: null
          })
    
        }) 
  
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: res
        })// return objectId
  
      },
      
    // add Notification to semester/term in schoolSession
    async addNotification(schoolName,schoolID,notificationID){

        //
        let schoolSession = null

        const options = {
          new: true,
          safe: true, 
          upsert: true
        }
  
        winstonLogger.info('ADD: notification')
        winstonLogger.info(JSON.stringify(paymentData,null,4))

        schoolSession = await this.getSchoolSessionID(schoolName,schoolID)
        winstonLogger.info(`sessionID: ${schoolSession}`)        
        
        //
        await schoolService._schoolSessionModel.
        findOneAndUpdate({
            _id: schoolSession.sessionObjectID
          },
          {
            $push: {'Terms[schoolSession.activeTerm].notifications': notificationID} // REVIEW
          },
          options
        ).
        then((result) => {
  
          winstonLogger.info('RESULT: add notification ')
          winstonLogger.info(result)
          res = result
  
        }).
        catch((e) => {
  
          winstonLogger.error('ERROR: removing notification from school')
          winstonLogger.error(e)
  
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: null
          })
    
        }) 
  
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: res
        })// return objectId
  
      }    


}

export default schoolSessionService