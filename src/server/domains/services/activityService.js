/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * ActivityService: () : ActivityModel
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

import ActivityModel from '../models/ActivityModel'
import SchoolModel from '../models/schoolModel'
import winstonLogger from  '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'
import schoolEvent from '../../interfaces/Events/schoolEvents'


const ActivityService = {

  // handle for the ActivityModel
  _activityModel: ActivityModel,
  _schoolModel: SchoolModel,
  // Create new Activity
  async createNewActivity(schoolName,schoolID,activityAlias,activityData) {

    winstonLogger.info('CREATE: Activity')
    winstonLogger.info(JSON.stringify(schoolName,null,4))
    winstonLogger.info(JSON.stringify(schoolID,null,4))
    winstonLogger.info(JSON.stringify(activityData,null,4))
    // Holds return data for this fucntion
    let response = null 
    // Check if Activity exists first returns promise resolved to true or false
    response = await ActivityService.ActivityExists(
        schoolName,
        schoolID,
        activityAlias
    ).
    then((result) => {

      // exists in database
        winstonLogger.info(`FIND: Activity exists: ${result.status}`)
        response = result.status

    }).
    catch((e) => {

        winstonLogger.error('ERROR: searching for Activity')
        winstonLogger.error(e)

        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
        })

    })
    // Becomes true if Activity already exists and we kick out of function
    if (response) {

        // Return to higher scope if Activity already exists
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
          Data: false
        })

    }
    let _activityID = null,_activityAlias = null
    // If it doesn't exist create the Activity
    const alias = activityAlias

    const cM = new ActivityModel({
      alias,
      schoolName,
      schoolID
    })

    winstonLogger.info('TO CREATE:')
    winstonLogger.info(JSON.stringify(cM,null,4))
    winstonLogger.info('DONE')
    
    await cM.
    save().
    then((result) => {
      
        //
        winstonLogger.info('CREATE: Activity')
        winstonLogger.info(result)
        _activityAlias = result.alias
        _activityID = result._id
        
    }).
    catch((e) => {  
      
        winstonLogger.error('ERROR: creating Activity')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
          Data: false
        })

    })

    winstonLogger.info('Event Data: ')
    winstonLogger.info(_activityAlias)
    winstonLogger.info(_activityID)
    //Activity has been created. add to the school document
    schoolEvent.
    emit(
        'school-ActivityCreated',
        {
          schoolName,
          schoolID,
          activityData: {
              _activityAlias,
              _activityID
          }
        }
      )// send a few params

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK, 
      Data: true
    })

  },
   /*
   * Checks if the Activity is in the Database without returning anyData
   * returns a boolean based on availability
   */
  async ActivityExists(schoolName,schoolID,activityAlias) {

    let res = {
      id: null,
      status: false
    }

      await ActivityService._schoolModel.
      findOne({
        Name: schoolName,
        schoolID
      }).
      then((result) => {

          //
          winstonLogger.info('FIND: Activity in School')
          winstonLogger.info(JSON.stringify(result,null,4))
          if(result){
                let activity = null
                for(activity in result.activities){
                    if(activity.Name === activityAlias){
                        res = {
                            id: result.activity.activityID,
                            status: true
                        }
                    }
                }
          }

      }).catch((e) => {

          winstonLogger.error('ERROR: error searching for Activity in school')
        
          return Promise.resolve({
            id: null,
            status: false
          })

      })

      return Promise.resolve(res)
    
  },
  

  /*
   * updates information on a Activity
   */
  async deleteActivity(schoolName,schoolID,activityData) {
      
      // Holds return data for this fucntion
      let response = null,id = null
      // Check if Activity exists first returns promise resolved to true or false
      await ActivityService.ActivityExists(
          schoolName,
          schoolID,
          activityData.activityAlias, 
          activityData.ActivityName
      ).
      then((result) => {

        // exists in database
          winstonLogger.info(`FIND: Activity exists: ${JSON.stringify(result,null,4)}`)
          response = result.status
          id = result.id

      }).
      catch((e) => {

          winstonLogger.error('ERROR: searching for Activity')
          winstonLogger.error(e)

          return Promise.resolve({
              statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
              Data: false
          })

      })
      // Becomes true if Activity already exists
      if (!response) {

          // Return to higher scope if Activity already exists
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      }
      
      // delete the Activity
      await ActivityService._activityModel.
      findOneAndRemove({
          _id: id
      }).
      then((result) => {
        
          //
          winstonLogger.info('DELETE: Activity')
          winstonLogger.info(result)
          
      }).
      catch((e) => {
        
          winstonLogger.error('ERROR: deleting Activity')
          winstonLogger.error(e)

          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      })

      //Activity has been created. add to the school document
      schoolEvent.
      emit(
          'school-ActivityDeleted',
          {
            schoolName,
            schoolID,
            activityData: {
                _activityName,
                _activityAlias,
                _activityID
            }
          }
        )// send a few params

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK, 
        Data: true
      })
  },
  /*
   * updates information on a Activity
   */
  async updateActivity(schoolName,schoolID,activityAlias, activityData) {
    
    let response = null, id = null
      // 
      await ActivityService.ActivityExists(
        schoolName,
        schoolID,
        activityAlias, 
        activityData.ActivityName
      ).
      then((result) => {

        // exists in database
          winstonLogger.info(`FIND: Activity exists: ${JSON.stringify(result,null,4)}`)
          response = result.status
          id = result.id

      }).
      catch((e) => {

          winstonLogger.error('ERROR: updating Activity')
          winstonLogger.error(e)

          return Promise.resolve({
              statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
              Data: false
          })

      })
      // Becomes true if Activity already exists
      if (!response) {

          // Return to higher scope if Activity already exists
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      }

      //
      await ActivityService._activityModel.
      findOneAndUpdate({
          _id: id
          },
          activityData
        ).
      then((result) => {
        
          //
          winstonLogger.info('UPDATE: Activity')
          winstonLogger.info(result)
          
      }).
      catch((e) => {
        
          winstonLogger.error('ERROR: updating Activity')
          winstonLogger.error(e)

          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      })

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK, 
        Data: true
      })

  },
  async removeActivity(schoolName,schoolID,activityAlias){
  
    let response = null, id = null
      // 
      await ActivityService.ActivityExists(
        schoolName,
        schoolID,
        activityAlias
      ).
      then((result) => {

        // exists in database
          winstonLogger.info(`FIND: Activity exists: ${JSON.stringify(result,null,4)}`)
          response = result.status
          id = result.id

      }).
      catch((e) => {

          winstonLogger.error('ERROR: finding Activity')
          winstonLogger.error(e)

          return Promise.resolve({
              statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
              Data: false
          })

      })
      // Becomes true if Activity already exists
      if (!response) {

          // Return to higher scope if Activity already exists
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      }

      //
      await ActivityService._activityModel.
      deleteOne({
        _id: id
      }).
      then((result) => {
        
          //
          winstonLogger.info('REMOVE: Activity')
          
      }).
      catch((e) => {
        
          winstonLogger.error('ERROR: removing Activity')

          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      })

      //FIRE EVENTS

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK, 
        Data: true
      })

  },
  
  async assignActivityTeacher(schoolName,schoolID,activityAlias, teacherID){

    let teacherRef = null,Name
      //check for teacher in school first
      ActivityService._schoolModel.
      find({
        Name: schoolName,
        schoolID
      }).
      then((result) => {

          //
          winstonLogger.info('FIND: Teacher in School')
          winstonLogger.info(result)
          if(result == null){
            res = {
              id: null,
              status: false
            }
          }else{
            let teacher = null
              for(teacher in result.Teachers){
                if(teacher.teacherID === teacherID){
                  Name = teacher.Name
                  teacherRef = teacher.teacherRef// REVIEW 
                }
              }
          }

      }).catch((e) => {

          winstonLogger.error('ERROR: error searching for teacher in school')
          winstonLogger.error(e)
        
          return Promise.resolve({
            id: null,
            status: false
          })

      })
      if(!teacherRef){
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: false
        })
      }

      //gotten teacher id
      // check for Activity in school
      let ActivityID = null
      await ActivityService.ActivityExists(
        schoolName,
        schoolID,
        activityAlias
      ).
      then((result) => {
        // exists in database
          winstonLogger.info(`FIND: Activity exists: ${JSON.stringify(result,null,4)}`)
          if(result){
            ActivityID = result.id
          }
      }).
      catch((e) => {

          winstonLogger.error('ERROR: finding Activity')
          return Promise.resolve({
              statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
              Data: false
          })

      })
      if(!ActivityID){
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: false
        })
      }
      
      // get previous activity teacher
      await ActivityService._activityModel.
      findOneAndUpdate({
          _id: ActivityID
      }).
      then((result) => {
        //
        winstonLogger.info('GET: old Activity teacherID')
        winstonLogger.info(JSON.stringify(result,null,4))
        if(result){
          oldteacherrRef = result.teacherRef 
        }

    }).catch((e) => {
        winstonLogger.error('ERROR: getting old Activity teacherID')
      
        return Promise.resolve({
          id: null,
          status: false
        })

    })
    // then add teacher id and name to Activity
    const options = {
      new: true,
      safe: true,
      upsert: true
    }


      await ActivityService._activityModel.
      findOneAndUpdate({
          _id: ActivityID
        },{
          teacher: {
            Name, 
            teacherRef
          }
        },
        options
      ).
      then((result) => {
        //
        winstonLogger.info('UPDATE: Activity teacherID')
        winstonLogger.info(JSON.stringify(result,null,4))
        if(result){
          ActivityID = result._id // enforce ID
        }

    }).catch((e) => {
        winstonLogger.error('ERROR: updating Activity teacherID')
      
        return Promise.resolve({
          id: null,
          status: false
        })

    })
      
    // update ActivityID in teacher
    //FIRE EVENTS
    winstonLogger.info('Event Data: ')
    winstsonLogger.info(teacherRef)
    winstonLogger.info(activityAlias)
    winstonLogger.info(ActivityID)
    //Activity has been created. add to the school document
    schoolEvent.
    emit(
        'school-ActivityTeacherUpdate',
        {
          activityAlias,
          ActivityID,
          teacherRef,
          oldteacherRef
        }
      )// send a few params

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: true
      })

  },
  async getActivity(schoolName,schoolID,activityAlias){
    
    // Holds return data for this fucntion
    let response = null,id = null
    // Check if Activity exists first returns promise resolved to true or false
    await ActivityService.ActivityExists(
        schoolName,
        schoolID,
        activityAlias
    ).
    then((result) => {

      // exists in database
        winstonLogger.info(`FIND: Activity exists: ${JSON.stringify(result,null,4)}`)
        response = result.status
        id = result.id

    }).
    catch((e) => {

        winstonLogger.error('ERROR: searching for Activity')
        winstonLogger.error(e)

        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
        })

    })
    // Becomes true if Activity already exists
    if (!response) {

        // Return to higher scope if Activity already exists
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
          Data: false
        })

    }
    
    winstonLogger.info(`Activity ID: ${id}`)
    // delete the Activity
    await ActivityService._activityModel.
    findOne({
        _id: id
    }).
    then((result) => {
      
        //
        winstonLogger.info('GET: Activity')
        winstonLogger.info(result)
        response = result
        
    }).
    catch((e) => {
      
        winstonLogger.error('ERROR: geting Activity')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
          Data: false
        })

    })

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
      Data: response
    })

  }

}

export default ActivityService