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
import schoolEvent from '../../interfaces/Events/schoolEvents'
import password from '../utils/password'

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
    await schoolSessionService._schoolSessionModel.
    findAll({
        _id: schoolSession.sessionObjectID
    }).
    // sort({ _id: -1 }).
    // limit(10).
    then((schoolSession) => {

      winstonLogger.info('GET: notifications')
      response = schoolSession.notifications
      winstonLogger.info(JSON.stringify(response,null,4))

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
    await schoolSessionService._schoolSessionModel.
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
  async createSchoolSession(SchoolName,SchoolID,notifications,sessionData) {

    winstonLogger.info('::schoolSessionService')

    // Holds return data for this fucntion
    let response,schoolSessionID,activeTerm = null
    winstonLogger.info('HERE WE ARE')
    winstonLogger.info(sessionData.firstTerm.termTitle)
    winstonLogger.info(JSON.stringify(sessionData,null,4))

    const sessionData1 = {
      SchoolName,
      schoolID: SchoolID,
      name: sessionData.name,
      academicYear: sessionData.academicYear,
      notifications: notifications,
        firstTerm: {
          termTitle: sessionData.firstTerm.termTitle,
          startDate: sessionData.firstTerm.startDate,
          endDate: sessionData.firstTerm.endDate
        }
    }
  
    //create schoolSession Document
    const ssM = new SchoolSessionModel(sessionData1)
    await ssM.save().
    then((schoolSessionData) => {

      winstonLogger.info('CREATE: schoolSession  B')
      winstonLogger.info(JSON.stringify(schoolSessionData,null,4))

      schoolSessionID = schoolSessionData._id
      activeTerm = schoolSessionData.firstTerm.termTitle
      
    }).
    catch((e) => {

      winstonLogger.error('ERROR: creating schoolSession')
      winstonLogger.error(JSON.stringify(e,null,4))

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    }) 

    winstonLogger.info('FIRING EVENTS')
    winstonLogger.info(SchoolName)
    winstonLogger.info(SchoolID)
    winstonLogger.info(schoolSessionID)
    winstonLogger.info(activeTerm)
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

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
      Data: schoolSessionID
    })// return objectId

  },

  //
  async getSchoolSession(SchoolName,SchoolID) {

    winstonLogger.info('::schoolSessionService')

    let schoolSession = null,res = null

    const options = {
      new: true
    }

    schoolSession = await this.getSchoolSessionID(SchoolName,SchoolID)
    winstonLogger.info(`sessionID: ${JSON.stringify(schoolSession,null,4)}`)
   
      // query and update schoolsesion document
      await schoolSessionService._schoolSessionModel.
      findOne({
          _id: schoolSession.sessionObjectID
      }).
      then((xsessionData) => {

          if(xsessionData === null ){
              return Promise.resolve({
                  statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
                  Data: false
                })
          }

          winstonLogger.info('GET: schoolSession')
          winstonLogger.info(JSON.stringify(schoolSession,null,4)) 
          res = xsessionData
      }).
      catch((e) => {

        winstonLogger.error('ERROR: getting schoolSession')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      }) 


      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: res
      })

  },
  async updateSchoolSession(SchoolName,SchoolID,sessionData) {

    winstonLogger.info('::schoolSessionService')

    let schoolSession = null

    const options = {
      new: true
    }

    schoolSession = await this.getSchoolSessionID(SchoolName,SchoolID)
    winstonLogger.info(`sessionID: ${JSON.stringify(schoolSession,null,4)}`)

    if(!schoolSession.sessionObjectID){
        winstonLogger.info('CREATE: NEW SESSION')
        return Promise.resolve(this.createSchoolSession(SchoolName,SchoolID,sessionData))
    }else{
          
      // query and update schoolsesion document
      await schoolSessionService._schoolSessionModel.
      findOneAndUpdate({
          _id: schoolSession.sessionObjectID,

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
          winstonLogger.info(JSON.stringify(xsessionData,null,4)) 

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
      
    }

  },

  async getSchoolSessionID(SchoolName,SchoolID){

    let sessionObjectID = null ,activeTerm = null

    winstonLogger.info('WHAT I WANT')
    winstonLogger.info(SchoolName)
    winstonLogger.info(SchoolID)
    // get the current schoolsessionID from the schoool document
    await schoolSessionService._schoolModel.
    findOne({
      Name: SchoolName,
      schoolID: SchoolID
    }).
    then((schoolInfo) => {

      winstonLogger.info('schoolInfo:')
      winstonLogger.info(schoolInfo)
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
          new: true
        }
  
        winstonLogger.info('REMOVE: notification')

        schoolSession = await this.getSchoolSessionID(schoolName,schoolID)
        winstonLogger.info(`sessionID: ${JSON.stringify(schoolSession,null,4)}`)        
        
        //
        await schoolSessionService._schoolSessionModel.
        findOneAndUpdate({
            _id: schoolSession.sessionObjectID
          },
          {
            $pull: {notifications: notificationID} // REVIEW
          },
          options
        ).
        then((result) => {
  
          winstonLogger.info('RESULT: remove notification ')
          winstonLogger.info(result)
  
        }).
        catch((e) => {
  
          winstonLogger.error('ERROR: removing notification from school')
          winstonLogger.error(e)
  
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: false
          })
    
        }) 
  
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: true
        })// return objectId
  
      },
      
    // add Notification to semester/term in schoolSession
    async addNotification(schoolName,schoolID,notificationID){

        //
        let schoolSession = null, res = null

        const options = {
          new: true,
          safe: true,
          upsert: true
        }
  
        winstonLogger.info('ADD: notification')
        winstonLogger.info(JSON.stringify(notificationID,null,4))

        schoolSession = await this.getSchoolSessionID(schoolName,schoolID)
        winstonLogger.info(`sessionID: ${JSON.stringify(schoolSession,null,4)}`)  
        winstonLogger.info(`notificationID: ${JSON.stringify(notificationID,null,4)}`)
        
        //
        await schoolSessionService._schoolSessionModel.
        findOneAndUpdate({
            _id: schoolSession.sessionObjectID,
            },
            {
              $push: {notifications: notificationID}
            },
            options
        ).
        then((result) => {
  
          winstonLogger.info('RESULT: add notification ')
          winstonLogger.info(result)
          res = result
  
        }).
        catch((e) => {
  
          winstonLogger.error('ERROR: adding notification to school')
          winstonLogger.error(e.stack)
  
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
      //
      async update_AccessCode(schoolName,schoolID,sessionName){

        //
        const options = {
          new: true,
          safe: true, 
          upsert: true
        }

        const h_accessCode = await password.hash(schoolID+sessionName)
  
        //
        await schoolSessionService._schoolModel.
        findOneAndUpdate({
            Name: schoolName,
            schoolID
          },
          {
            public_ACCESS_CODE: h_accessCode
          },
          options
        ).
        then((result) => {
  
          winstonLogger.info('UPDATE: public_ACCESS_CODE ')
          winstonLogger.info(result)
  
        }).
        catch((e) => {
  
          winstonLogger.error('ERROR: updating public_ACCESS_CODE')
          winstonLogger.error(e)
  
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: false
          })
    
        }) 
  
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: true
        })// return objectId
  
      },


}

export default schoolSessionService