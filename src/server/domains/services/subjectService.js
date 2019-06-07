/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * subjectService: () : SubjectModel
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

import SubjectModel from '../models/subjectModel'
import SubjectHolderModel from '../models/subjectHolderModel'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums';
import schoolEvent from '../../interfaces/Events/schoolEvents';


const subjectService = {

  // handle for the SubjectModel
  _subjectModel: SubjectModel,
  _subjectHolderModel: SubjectHolderModel,
  // create New subjectHolder
  async createSubjectHolder(schoolName,schoolID,subjectName,subjectDescription) {

    // Holds return data for this fucntion
    let response = null, subjectID = null
    // Check if class exists first returns promise resolved to true or false
    await subjectService.subjectHolderExists(subjectName,schoolName,schoolID).
    then((result) => {

      // Email exists in database
        response = result

    }).
    catch((err) => Promise.resolve({Data: false,statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR}))
    // Becomes true if class alrey exists and we kick out of function
    if (response) {

      // Return to higher scope if there's a user
      return Promise.resolve({Data: false,statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR})

    }

    const shM = new SubjectHolderModel({
      title: subjectName,
      Description: subjectDescription,
      schoolName,
      schoolID
    })

    await shM.save().
    then((result) => {

      winstonLogger.info('CRATE: schoolHolder')
      winstonLogger.info(JSON.stringify(result,null,4))
      subjectID = result._id
      response = {Data: false,statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK}

    }).
    catch((e) => {

      winstonLogger.info('ERROR: creating schoolholder')
      winstonLogger.info(e)
      return Promise.resolve({Data: false,statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR})

    })

    winstonLogger.info('FIRING EVENTS')
    winstonLogger.info(schoolName)
    winstonLogger.info(schoolID)
    winstonLogger.info(subjectName)
    winstonLogger.info(subjectID)
    // fire event with schoolSessionID as param to save objectID to school document as current Session
    schoolEvent.
    emit(
        'school-subjectCreated',
        {
          schoolName,
          schoolID,
          subjectName,
          subjectID
        }
    )// send a few params

    return Promise.resolve(response)

  },
  async getSubjectHolder(key, clientID) {


  },
  async removeSubjectHolder(schoolName,schoolID,subjectName) {

    // Holds return data for this fucntion
    let response = false, subjectID = null

    await subjectService._subjectHolderModel.deleteOne({
      title: subjectName,
      schoolName,
      schoolID
    }).
    then((result) => {

      winstonLogger.info('REMOVE: subjectHolder')
      winstonLogger.info(JSON.stringify(result,null,4))
      if(result){
        subjectID = result._id
      }
      response = {Data: false,statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK}

    }).
    catch((e) => {

      winstonLogger.info('ERROR: removing subjectHolder')
      winstonLogger.info(e)
      return Promise.resolve({Data: false,statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR})

    })

    winstonLogger.info('FIRING EVENTS')
    winstonLogger.info(schoolName)
    winstonLogger.info(schoolID)
    winstonLogger.info(subjectName)
    winstonLogger.info(subjectID)
    // fire event with schoolSessionID as param to save objectID to school document as current Session
    schoolEvent.
    emit(
        'school-subjectDeleted',
        {
          schoolName,
          schoolID,
          subjectName,
          subjectID
        }
    )// send a few params

    return Promise.resolve(response)

  },

  // Create new 
  async createNewSubject(schoolName,schoolID,classAlias,subjectName,subjectData) {

    // Holds return data for this fucntion
    let response = null, subjectID = null
    // Check if class exists first returns promise resolved to true or false
    await subjectService.subjectExists(schoolName,schoolID,subjectName,classAlias).
    then((result) => {
        response = result
    }).
    catch((err) => {

      winstonLogger.error('ERROR: checking if subject exists')
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
        Data:false
      })

    })
    // Becomes true if class already exists and we kick out of function
    if (response) { //

      // Return to higher scope if there's a user
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
        Data:false
      })

    }
    const sM = new SubjectModel({
      schoolName,
      schoolID,
      subjectName,
      classAlias
    })
    await sM.save().
    then((result) => {

      winstonLogger.info('CREATE: subject')
      winstonLogger.info(JSON.stringify(result,null,4))
      if(result){
        subjectID = result._id
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: cretaing subject')
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
        Data:false
      })

    })

    
    winstonLogger.info('FIRING EVENTS')
    winstonLogger.info(schoolName)
    winstonLogger.info(schoolID)
    winstonLogger.info(subjectName)
    winstonLogger.info(subjectID)
    winstonLogger.info(classAlias)
    // fire event with schoolSessionID as param to save objectID to school document as current Session
    schoolEvent.
    emit(
        'school-classSubjectCreated',
        {
          schoolName,
          schoolID,
          subjectName,
          subjectID,
          classAlias
        }
    )// send a few params

    return response

  },
  //
  async subjectHolderExists(subjectName,schoolName,schoolID) {

    let eeResult = null

    winstonLoger.info('HERE WE ARE')
    // Check subject
    await subjectService.
    _subjectHolderModel.
    findOne({
      title: subjectName,
      schoolName,
      schoolID
    }).
    then((Data) => {
 
        winstsonLogger.info(`FOUND: ${Data}`)
        eeResult = Promise.resolve(true)
     
    }).
    catch((err) => {

      winstonLogger.error('error checking database')
      winstonLogger.error(err)
      eeResult = Promise.resolve(false)

    })

    return eeResult

  },

   /*
   * Checks if the subject is in the Database without returning anyData
   * returns a boolean based on availability
   */
  async subjectExists(schoolName,schoolID,subjectName,classAlias) {

    let eeResult = null

    // Check class
    await subjectService.
    _subjectHolderModel.
    findOne({
      schoolName,
      schoolID,
      title: subjectName,
    }).
    then((Data) => {

        winstonLogger.info(`FOUND: ${Data}`)
        if(Data){
          if(Data[classAlias] !== null){
            eeResult = Promise.resolve(true)
          }
        }

    }).
    catch((err) => {

      winstonLogger.error('error checking database')
      eeResult = Promise.resolve(false)

    })

    return eeResult 

  },
  async removeSubject(schoolName,schoolID,classAlias,subjectName) {
    // Holds return data for this fucntion
    let response = null, subjectID = null
    // Check if class exists first returns promise resolved to true or false
    
    await subjectService._subjectModel.deleteOne({
      schoolName,
      schoolID,
      subjectName,
      classAlias
    }).
    then((result) => {

      winstonLogger.info('DELETE: subject')
      winstonLogger.info(JSON.stringify(result,null,4))
      if(result){
        subjectID = result._id
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: deleting subject')
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
        Data:false
      })

    })

    
    winstonLogger.info('FIRING EVENTS')
    winstonLogger.info(schoolName)
    winstonLogger.info(schoolID)
    winstonLogger.info(subjectName)
    winstonLogger.info(subjectID)
    winstonLogger.info(classAlias)
    // fire event with schoolSessionID as param to save objectID to school document as current Session
    schoolEvent.
    emit(
        'school-classSubjectDeleted',
        {
          schoolName,
          schoolID,
          subjectName,
          subjectID,
          classAlias
        }
    )// send a few params

    return response

  },
  async getSubject(schoolName,schoolID,classAlias,subjectName) {

    let result = null,subjectID = null

    await subjectService._subjectHolderModel.
    findOne({
      title: subjectName,
      schoolName,
      schoolID
    }).
    then((res) => {

      winstonLogger.info('GET: SubjectID')
      winstonLogger.info(JSON.stringify(res,null,4))
      if(res){
        subjectID = res[classAlias]
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting subjectID')
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    })

    if(!subjectID){
      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })
    }

    await subjectService._subjectModel.
    findOne({
      _id: subjectID
    }).
    then((res) => {

      winstonLogger.info('GET: Subject')
      winstonLogger.info(JSON.stringify(res,null,4))
      if(res){
        result = {
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: res
        }
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: getting subject')
      result = Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
        Data: false
      })

    })

    return Promise.resolve(result)

  },

  //
  async addSubjecttoHolder(schoolName,schoolID,subjectName,subjectID,classAlias) {
    
    //
    let result = null

    const options = {
      new: true,
      safe: true,
      upsert: true
    }
    let subjectIDx = {}

    winstonLogger.info(`classAlias: ${classAlias}`)
    const classAliasx = (classAlias[0] == 'J') ? Number(classAlias.replace(/\D/g,'')) - 1 : Number(classAlias.replace(/\D/g,'')) + 2
    winstonLogger.info(classAliasx)
    subjectIDx[classAliasx] = subjectID
    winstonLogger.info(JSON.stringify(subjectIDx,null,4))
    const Data0 = {
        JS1: subjectIDx[0],
        JS2: subjectIDx[1],
        JS3: subjectIDx[2],
        SS1: subjectIDx[3],
        SS2: subjectIDx[4],
        SS3: subjectIDx[5],
    }
    let Data = {}, x, counter = 0

    for(x in Data0){
      winstonLogger.info('tests')
      winstonLogger.info(JSON.stringify(x,null,4))
      if(counter === classAliasx){
        Data = Object.assign({[x]: subjectID})
      }
      counter++
    }
    winstonLogger.info('th BET')
    winstonLogger.info(JSON.stringify(Data,null,4))

    await subjectService._subjectHolderModel.
    findOneAndUpdate({
      title: subjectName,
      schoolName,
      schoolID
      },
      Data,
      options
    ).
    then((res) => {

      winstonLogger.info('UPDATE: adding subjectID to Holder')
      winstonLogger.info(res)
      if(res){
        result = Promise.resolve(true)
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: adding subjectID to Holder')
      result = Promise.resolve(false)

    })

    return result

  },
  async removeSubjectfromHolder(schoolName,schoolID,subjectName,subjectID,classAlias) {
    //
    let result = null

    const options = {
      new: true,
      safe: true,
      upsert: true
    }
    let subjectIDx = {}

    winstonLogger.info(`classAlias: ${classAlias}`)
    const classAliasx = (classAlias[0] == 'J') ? Number(classAlias.replace(/\D/g,'')) - 1 : Number(classAlias.replace(/\D/g,'')) + 2
    winstonLogger.info(classAliasx)
    subjectIDx[classAliasx] = subjectID
    winstonLogger.info(JSON.stringify(subjectIDx,null,4))
    const Data0 = {
        JS1: subjectIDx[0],
        JS2: subjectIDx[1],
        JS3: subjectIDx[2],
        SS1: subjectIDx[3],
        SS2: subjectIDx[4],
        SS3: subjectIDx[5],
    }
    let Data = {}, x, counter = 0

    for(x in Data0){
      winstonLogger.info('tests')
      winstonLogger.info(JSON.stringify(x,null,4))
      if(counter === classAliasx){
        Data = Object.assign({[x]: null})
      }
      counter++
    }
    winstonLogger.info('th BET')
    winstonLogger.info(JSON.stringify(Data,null,4))

    await subjectService._subjectHolderModel.
    findOneAndUpdate({
      title: subjectName,
      schoolName,
      schoolID
      },
      Data,
      options
    ).
    then((res) => {

      winstonLogger.info('UPDATE: removing subjectID from Holder')
      winstonLogger.info(res)
      if(res){
        result = Promise.resolve(true)
      }

    }).
    catch((e) => {

      winstonLogger.error('ERROR: removing subjectID from Holder')
      result = Promise.resolve(false)

    })

    return result
    
  },

}

export default subjectService