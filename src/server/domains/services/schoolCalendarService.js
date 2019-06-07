/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * schoolCalendarService: () : SchoolSessionModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *
 */

import schoolSessionService from '../services/schoolSessionService'
import SchoolCalendarModel from '../models/schoolCalendarModel'
import SchoolSessionModel from '../models/SchoolSessionModel'
import SchoolModel from '../models/schoolModel'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'
import schoolEvent from '../../interfaces/Events/schoolEvents'
import password from '../utils/password'

const schoolCalendarService = {

  // handle for the SchoolSessionModel
  _schoolCalelndarModel: SchoolCalendarModel,
  _schoolSessionModel: SchoolSessionModel,
  
  // Empty calendar is created when session is created
  async createCalendar(SchoolName,SchoolID,sessionID) {

    winstonLogger.info('::schoolCalendarService')

    let response =null, createResponse = false,calendarID = null
    const options = {
        new: true
    }

    const scM = new SchoolCalendarModel({
        schoolName: SchoolName,
        schoolID: SchoolID
    })

    await scM.
    save().
    then((schoolSession) => {
      winstonLogger.info('CREATE: calendar')
        if(schoolSession){
            response = schoolSession
            winstonLogger.info(response)
            createResponse = true
            calendarID = schoolsession.calendarID
        }
    }).
    catch((e) => {
      winstonLogger.error('ERROR: creating Calendar')
      winstonLogger.error(e)

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    })
    if(createResponse == false){
        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: false
          })
    }
    //
    await schoolCalendarService._schoolSessionModel.
    findOneAndUpdate({
        _id: sessionID
        },
        {calendarID: calendarID },
        options
    ).
    then((schoolSession) => {

      winstonLogger.info('UPDATE: schoolSession with calendar')
      response = schoolSession
      winstonLogger.info(response)
    }).
    catch((e) => {

      winstonLogger.error('ERROR: updating schoolSession with Calendar')
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
  async getCalendarID(schoolName,schoolID){
    const session = await schoolSessionService.getSchoolSessionID(schoolName,schoolID)
    await schoolCalendarService._schoolSessionModel.
    findOne({_id: session.sessionObjectID}).
    then((sessionData) => {
        if(sessionData){
            winstonLogger.info('current SESSION:')
            winstonLogger.info(JSON.stringify(sessionData,null,4))
            calendarID = sessionData.calendarID
        }
    }).
    catch((e) => {
        winstonLogger.error('ERROR: getting calendarID')
        winstonLogger.error(e)
        return Promise.resolve(null)
    })
    return Promise.resolve(calendarID)
  },
  async getCurrentSessionCalendar(schoolName,schoolID){

    let calendar = null
    const calendarID = await this.getCalendarID(schoolName,schoolID)
    if(!calendarID){
        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: null
        })
    }
    await schoolCalendarService._schoolCalelndarModel.
    findOne({_id: calendarID}).
    then((calendarData) => {
        if(calendarData){
            winstonLogger.info('CALENDAR')
            winstonLogger.info(calendarData)
            calendar = calendarData
        }
    }).
    catch((e) => {
        winstonLogger.error('ERROR: getting calendar')
        winstonLogger.error(e)
        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: null
        })
    })

    return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: calendar
    })

  },
  async addEvent(schoolName,schoolID,Event){
    
    let res = false

    const calendarID = await this.getCalendarID(schoolName,schoolID)
    if(!calendarID){
        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: null
        })
    }
    await schoolCalendarService._schoolCalelndarModel.
    findOneAndUpdate({
        _id: calendarID
        },
        {$push: {Events: Event}}).
    then((calendarData) => {
        if(calendarData){
            winstonLogger.info('CALENDAR')
            winstonLogger.info(calendarData)
            res = true
        }
    }).
    catch((e) => {
        winstonLogger.error('ERROR: adding event to calendar')
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
  async getEvent(schoolName,schoolID,EventID){
    let res = false

    const calendarID = await this.getCalendarID(schoolName,schoolID)
    if(!calendarID){
        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: null
        })
    }
    await schoolCalendarService._schoolCalelndarModel.
    findOne({
        _id: calendarID
    }).
    findOne({EventID})
    then((EventData) => {
        if(EventData){
            winstonLogger.info('EVENT')
            winstonLogger.info(EventData)
            res = EventData
        }
    }).
    catch((e) => {
        winstonLogger.error('ERROR: getting event from calendar')
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
  async updateEvent(schoolName,schoolID,EventID,EventData){
    let res = false
    const options = {
        new: true
    }

    const calendarID = await this.getCalendarID(schoolName,schoolID)
    if(!calendarID){
        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: null
        })
    }
    await schoolCalendarService._schoolCalelndarModel.
    findOne({
        _id: calendarID
    }).
    findOneAndUpdate({EventID},EventData,options)
    then((EventData) => {
        if(EventData){
            winstonLogger.info('updated EVENT')
            winstonLogger.info(EventData)
            res = EventData
        }
    }).
    catch((e) => {
        winstonLogger.error('ERROR: getting event from calendar')
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
  async removeEvent(schoolName,schoolID,EventID){

    let res = false

    const calendarID = await this.getCalendarID(schoolName,schoolID)
    if(!calendarID){
        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: null
        })
    }
    await schoolCalendarService._schoolCalelndarModel.
    findOne({
        _id: calendarID
    }).
    findOneAndRemove({EventID})
    then((EventData) => {
        if(EventData){
            winstonLogger.info('removed EVENT')
            winstonLogger.info(EventData)
            res = EventData
        }
    }).
    catch((e) => {
        winstonLogger.error('ERROR: removing event from calendar')
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
  }


}

export default schoolCalendarService