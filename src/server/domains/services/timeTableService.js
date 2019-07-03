/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * timeTableService: () : timeTableModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *      create | insert
 *      remove | delete
 *      findBy | search
 *      get    | retrieve
 *             | update
 *
 *
 */

import TimeTableModel from '../../domains/models/timeTableModel'
import publicEnums from '../../app/publicEnums';
import schoolEvent from '../../interfaces/Events/schoolEvents'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import schoolService from './schoolService'

const timeTableService = {

    _timeTableModel : TimeTableModel,
  // Create new class timeTable
  async createTimetable(schoolName,schoolID,classAlias,timeTableData) {
    
    let result = null,timeTableID = null

    winstonLogger.info('INPUT:')
    winstonLogger.info(schoolName)
    winstonLogger.info(schoolID)
    winstonLogger.info(classAlias)
    winstonLogger.info(timeTableData)
    winstonLogger.info('NEXT:')
    // create datastructure
    const timeTableDatax = {
        MONDAY:  [{
                subject:null,
                teacher:null,
                startTime: null,
                endTime: null
            }],
        TUESDAY: [{
                subject:null,
                teacher:null,
                startTime: null,
                endTime: null
            }],
        WEDNESSDAY: [{
                subject:null,
                teacher:null,
                startTime: null,
                endTime: null
            }],
        THURSDAY: [{
                subject:null,
                teacher:null,
                startTime: null,
                endTime: null
            }],
        FRIDAY: [{
                subject:null,
                teacher:null,
                startTime: null,
                endTime: null
            }]
    }
    

    //clean - empty
    timeTableDatax.MONDAY.pop()
    timeTableDatax.TUESDAY.pop()
    timeTableDatax.WEDNESSDAY.pop()
    timeTableDatax.THURSDAY.pop()
    timeTableDatax.FRIDAY.pop()

    let queue = null
    //
    for (queue in timeTableData){
        winstonLogger.info('QUEUE:')
        winstonLogger.info(JSON.stringify(timeTableData[queue],null,4))
        timeTableDatax.MONDAY.push({
            startTime: timeTableData[queue].duration.startTime,
            endTime: timeTableData[queue].duration.endTime,
            subject: timeTableData[queue].Monday
        })
        timeTableDatax.TUESDAY.push({
            startTime: timeTableData[queue].duration.startTime,
            endTime: timeTableData[queue].duration.endTime,
            subject: timeTableData[queue].Tuesday
        })
        timeTableDatax.WEDNESSDAY.push({
            startTime: timeTableData[queue].duration.startTime,
            endTime: timeTableData[queue].duration.endTime,
            subject: timeTableData[queue].Wednessday
        })
        timeTableDatax.THURSDAY.push({
            startTime: timeTableData[queue].duration.startTime,
            endTime: timeTableData[queue].duration.endTime,
            subject: timeTableData[queue].Thursday
        })
        timeTableDatax.FRIDAY.push({
            startTime: timeTableData[queue].duration.startTime,
            endTime: timeTableData[queue].duration.endTime,
            subject: timeTableData[queue].Friday
        })
    }

    let res = null 
    await schoolService._schoolModel.findOne({Name: schoolName,schoolID}).
    then((data) => {
        
        winstonLogger.info('XD:')
        winstonLogger.info(JSON.stringify(data,null,4))
        res = data

    }).
    catch((e) => {
        winstonLogger.error('ERROR:')
    })

    winstonLogger.info('NOW')
    winstonLogger.info(res.currentSessionID)


    let classID =  null, classx = null

    for(classx in res.classList){
        if(Number.isInteger(parseInt(classx))){
            winstonLogger.info('CLASS')
            winstonLogger.info(classx)
            if(res.classList[classx].classAlias === classAlias){
                winstonLogger.info('CLASSREF:')
                winstonLogger.info(classx.classRef)
                classID = res.classList[classx].classRef
            }
        }
    }
    // add classAlias and school
    timeTableDatax.schoolName = schoolName 
    timeTableDatax.schoolID = schoolID 
    timeTableDatax.classID = classID
    timeTableDatax.sessionID = res.currentSessionID 
    
    winstonLogger.info('here we are')
    winstonLogger.info(JSON.stringify(timeTableDatax,null,4))

    const tTM = new timeTableService._timeTableModel(timeTableDatax)

    await tTM.save().
    then((res) => {

        winstonLogger.info('CREATE: TIMETABLE')
        winstonLogger.info(res)

        if(res){

            timeTableID = res._id
            result = {
                statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
                Data: res._id
            }
        }

    }).
    catch((e) => {

        winstonLogger.error('ERROR: creating timeTable')
        winstonLogger.error(e)

        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            Data: false
        })
    })

    //FIRE EVENTS -> save timeTable in class
    schoolEvent.emit(
        'school-timeTableCreated',
        {
            schoolName,
            schoolID,
            classAlias,
            timeTableID
        }
    )

    //
    return Promise.resolve(result)

  },

}

export default timeTableService