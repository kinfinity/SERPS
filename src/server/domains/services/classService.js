/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * classService: () : ClassModel
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

import ClassModel from '../models/ClassModel'
import SchoolModel from '../models/schoolModel'
import winstonLogger from  '../../Infrastructure/utils/winstonLogger'
import publicEnums from '../../app/publicEnums'
import schoolEvent from '../../interfaces/Events/schoolEvents';
import timeTableService from './timeTableService';


const classService = {

  // handle for the ClassModel
  _classModel: ClassModel,
  _schoolModel: SchoolModel,
  // Create new class
  async createNewClass(schoolName,schoolID,classAlias,classData) {

    winstonLogger.info('CREATE: class')
    winstonLogger.info(JSON.stringify(schoolName,null,4))
    winstonLogger.info(JSON.stringify(schoolID,null,4))
    winstonLogger.info(JSON.stringify(classData,null,4))
    // Holds return data for this fucntion
    let response = null
    // Check if class exists first returns promise resolved to true or false
    response = await classService.classExists(
        schoolName,
        schoolID,
        classAlias
    ).
    then((result) => {

      // exists in database
        winstonLogger.info(`FIND: class exists: ${result.status}`)
        response = result.status

    }).
    catch((e) => {

        winstonLogger.error('ERROR: searching for class')
        winstonLogger.error(e)

        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
        })

    })
    // Becomes true if class already exists and we kick out of function
    if (response) {

        // Return to higher scope if class already exists
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
          Data: false
        })

    }
    let _classID = null,_className = null,_classAlias = null
    // If it doesn't exist create the class
    const name = classData.Name
    const alias = classAlias
    // public_HASHED_CODE: classData.public_HASHED_CODE

    const cM = new ClassModel({
      name,
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
        winstonLogger.info('CREATE: class')
        winstonLogger.info(result)
        _classAlias = result.alias
        _classID = result._id
        _className = result.name
        
    }).
    catch((e) => {  
      
        winstonLogger.error('ERROR: creating class')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
          Data: false
        })

    })

    winstonLogger.info('Event Data: ')
    winstonLogger.info(_className)
    winstonLogger.info(_classAlias)
    winstonLogger.info(_classID)
    //class has been created. add to the school document
    schoolEvent.
    emit(
        'school-classCreated',
        {
          schoolName,
          schoolID,
          classData: {
              _className,
              _classAlias,
              _classID
          }
        }
      )// send a few params

    return Promise.resolve({
      statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK, 
      Data: true
    })

  },
   /*
   * Checks if the class is in the Database without returning anyData
   * returns a boolean based on availability
   */
  async classExists(schoolName,schoolID,classAlias) {

    let x = null
    let res = {
      id: null,
      status: null
    }
    
    //
      await classService._schoolModel.
      findOne({
        Name: schoolName,
        schoolID
      }).
      then((result) => {

          //
          winstonLogger.info('FIND: class in School')
          winstonLogger.info(result.classList[0])
          if(!result){
            res = {
              id: null,
              status: false
            }
          }else{

            const range = (start, end) => new Array(end - start + 1).
            fill(undefined).map((_, i) => i + start)

            for(x in range(0,8)){
              winstonLogger.info('CLASS:')
              winstonLogger.info(result.classList[x])
              winstonLogger.info(result.classList[x].classAlias)
              winstonLogger.info('here...')
              if(result.classList[x].classAlias === classAlias){
                winstonLogger.info('FOUND:')
                winstonLogger.info(JSON.stringify(result.classList[x],null,4))
                res = {
                  id: result.classList[x].classRef,
                  status: true
                }
                break
              }
            }
          }

      }).catch((e) => {

          winstonLogger.error('ERROR: error searching for class in school')
          winstonLogger.error(e)
        
          return Promise.resolve({
            id: null,
            status: false
          })

      })

      return Promise.resolve(res)
    
  },
  

  /*
   * updates information on a class
   */
  async deleteClass(schoolName,schoolID,classData) {
      
      // Holds return data for this fucntion
      let response = null,id = null
      // Check if class exists first returns promise resolved to true or false
      await classService.classExists(
          schoolName,
          schoolID,
          classData.classAlias, 
          classData.className
      ).
      then((result) => {

        // exists in database
          winstonLogger.info(`FIND: class exists: ${JSON.stringify(result,null,4)}`)
          response = result.status
          id = result.id

      }).
      catch((e) => {

          winstonLogger.error('ERROR: searching for class')
          winstonLogger.error(e)

          return Promise.resolve({
              statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
              Data: false
          })

      })
      // Becomes true if class already exists
      if (!response) {

          // Return to higher scope if class already exists
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      }
      
      // delete the class
      await classService._classModel.
      findOneAndRemove({
          _id: id
      }).
      then((result) => {
        
          //
          winstonLogger.info('DELETE: class')
          winstonLogger.info(result)
          
      }).
      catch((e) => {
        
          winstonLogger.error('ERROR: deleting class')
          winstonLogger.error(e)

          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      })

      //class has been created. add to the school document
      schoolEvent.
      emit(
          'school-classDeleted',
          {
            schoolName,
            schoolID,
            classData: {
                _className,
                _classAlias,
                _classID
            }
          }
        )// send a few params

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK, 
        Data: true
      })
  },
  /*
   * updates information on a class
   */
  async updateClass(schoolName,schoolID,classAlias, classData) {
    
    let response = null, id = null
      // 
      await classService.classExists(
        schoolName,
        schoolID,
        classAlias
      ).
      then((result) => {

        // exists in database
          winstonLogger.info(`FIND: class exists: ${JSON.stringify(result,null,4)}`)
          response = result.status
          id = result.id

      }).
      catch((e) => {

          winstonLogger.error('ERROR: updating class')
          winstonLogger.error(e)

          return Promise.resolve({
              statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
              Data: false
          })

      })
      // Becomes true if class already exists
      if (!response) {

          // Return to higher scope if class already exists
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      }

      //
      await classService._classModel.
      findOneAndUpdate({
          _id: id
          },
          classData
        ).
      then((result) => {
        
          //
          winstonLogger.info('UPDATE: class')
          winstonLogger.info(result)
          
      }).
      catch((e) => {
        
          winstonLogger.error('ERROR: updating class')
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
  async removeClass(schoolName,schoolID,classAlias){
  
    let response = null, id = null
      // 
      await classService.classExists(
        schoolName,
        schoolID,
        classAlias
      ).
      then((result) => {

        // exists in database
          winstonLogger.info(`FIND: class exists: ${JSON.stringify(result,null,4)}`)
          response = result.status
          id = result.id

      }).
      catch((e) => {

          winstonLogger.error('ERROR: finding class')
          winstonLogger.error(e)

          return Promise.resolve({
              statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
              Data: false
          })

      })
      // Becomes true if class already exists
      if (!response) {

          // Return to higher scope if class already exists
          return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
          })

      }

      //
      await classService._classModel.
      deleteOne({
        _id: id
      }).
      then((result) => {
        
          //
          winstonLogger.info('REMOVE: class')
          
      }).
      catch((e) => {
        
          winstonLogger.error('ERROR: removing class')

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
  
  async assignClassTeacher(schoolName,schoolID,classAlias, teacherID){

    let teacherRef = null,Name
      //check for teacher in school first
      classService._schoolModel.
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
      // check for class in school
      let classID = null
      await classService.classExists(
        schoolName,
        schoolID,
        classAlias
      ).
      then((result) => {
        // exists in database
          winstonLogger.info(`FIND: class exists: ${JSON.stringify(result,null,4)}`)
          if(result){
            classID = result.id
          }
      }).
      catch((e) => {

          winstonLogger.error('ERROR: finding class')
          return Promise.resolve({
              statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
              Data: false
          })

      })
      if(!classID){
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: false
        })
      }
      // then add teacher id and name to class
      const options = {
        new: true,
        safe: true,
        upsert: true
      }

      await classService._classModel.
      findOneAndUpdate({
          _id: classID
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
        winstonLogger.info('UPDATE: class teacherID')
        winstonLogger.info(JSON.stringify(result,null,4))
        if(result){
          classID = result._id // enforce ID
        }

    }).catch((e) => {
        winstonLogger.error('ERROR: updating class teacherID')
      
        return Promise.resolve({
          id: null,
          status: false
        })

    })
      
    // update classID in teacher
    //FIRE EVENTS
    winstonLogger.info('Event Data: ')
    winstsonLogger.info(teacherRef)
    winstonLogger.info(classAlias)
    winstonLogger.info(classID)
    //class has been created. add to the school document
    schoolEvent.
    emit(
        'school-classTeacherUpdate',
        {
          schoolName,
          schoolID,
          classAlias,
          classID,
          teacherRef
        }
      )// send a few params

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: true
      })

  },
  async getClass(schoolName,schoolID,classAlias){
    
    // Holds return data for this fucntion
    let response = null,id = null
    // Check if class exists first returns promise resolved to true or false
    await classService.classExists(
        schoolName,
        schoolID,
        classAlias
    ).
    then((result) => {

      // exists in database
        winstonLogger.info(`FIND: class exists: ${JSON.stringify(result,null,4)}`)
        response = result.status
        id = result.id

    }).
    catch((e) => {

        winstonLogger.error('ERROR: searching for class')
        winstonLogger.error(e)

        return Promise.resolve({
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
            Data: false
        })

    })
    // Becomes true if class already exists
    if (!response) {

        // Return to higher scope if class already exists
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR, 
          Data: false
        })

    }
    
    winstonLogger.info(`CLASS ID: ${id}`)
    // delete the class
    await classService._classModel.
    findOne({
        _id: id
    }).
    then((result) => {
      
        //
        winstonLogger.info('GET: class')
        winstonLogger.info(result)
        response = result
        
    }).
    catch((e) => {
      
        winstonLogger.error('ERROR: deleting class')
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

  },
  async addSubjecttoClass(schoolName,schoolID,subjectName,subjectID,classAlias){
    
    let response = null
    //
    const  options = {
      new: true,
      safe: true,
      upsert: true
    }

    await classService._classModel.
    findOneAndUpdate({
        schoolName,
        schoolID,
        alias: classAlias
        },
        {
          $push: {
            subjects: {
              Name:subjectName,
              Ref: subjectID
            }
          }
        },
        options
    ).
    then((result) => {
      
        //
        winstonLogger.info('ADD: subject to class')
        winstonLogger.info(result)
        response = result
        
    }).
    catch((e) => {
      
        winstonLogger.error('ERROR: adding subject to class')
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

  },
  async removeSubjectfromClass(schoolName,schoolID,subjectName,subjectID,classAlias){
    let response = null
    //
    const  options = {
      new: true,
      safe: true,
      upsert: true
    }

    await classService._classModel.
    findOneAndUpdate({
        schoolName,
        schoolID,
        alias: classAlias
        },
        {
          $pull: {
            subjects: {
              Name:subjectName,
              Ref: subjectID
            }
          }
        },
        options
    ).
    then((result) => {
      
        //
        winstonLogger.info('REMOVE: subject to class')
        winstonLogger.info(result)
        response = result
        
    }).
    catch((e) => {
      
        winstonLogger.error('ERROR: removing subject from class')
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

  },

  // 
  async addtimeTable(schoolName,schoolID,classAlias,timeTableID){

    let response = null
    winstonLogger.info('ADD TIMETABLE DATA:')
    winstonLogger.info(timeTableID)
    winstonLogger.info(schoolName)
    winstonLogger.info(schoolID)
    winstonLogger.info(classAlias)
    //
    const  options = {
      new: true,
      safe: true,
      upsert: true
    }

    await classService._classModel.
    findOneAndUpdate({
        schoolName,
        schoolID,
        alias: classAlias
        },
        {
          timeTableID
        },
        options
    ).
    then((result) => {
      
        //
        winstonLogger.info('ADD: timeTableID to class')
        winstonLogger.info(result)
        response = result
        
    }).
    catch((e) => {
      
        winstonLogger.error('ERROR: adding timeTableD to class')
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

  },
  async getClassTimetable(schoolName,schoolID,classAlias){

    let timeTableID = null, timeTableData = null, classx = null

    await schoolService._schoolModel.
      findOne({
        Name: schoolName,
        schoolID
      }).then((schoolData) => {

       //
       if(schoolData){
        for(classx in schoolData.classList){
          if(Number.isInteger(parseInt(classx))){
              winstonLogger.info('CLASS')
              winstonLogger.info(classx)
              if(schoolData.classList[classx].classAlias === classAlias){
                  winstonLogger.info('timeTableID:')
                  winstonLogger.info(schoolData.classList[classx].timeTableID)
                  timeTableID = schoolData.classList[classx].timeTableID
              }
          }
        }
       }

      }).catch((e) => {

        winstonLogger.error('error getting timetTableID')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

      if(!timeTableID){
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })
      }

      // get timeTable
      timeTableService._timeTableModel.
      findOne({
        _id: timeTableID
      }).
      then((Data) => {

        if(Data){
          
          //
          timeTable = Data
        }

      }).catch((e) => {
        
        winstonLogger.error('error getting timetTable')
        winstonLogger.error(e)

        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
          Data: null
        })

      })

      return Promise.resolve({
        statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
        Data: timeTableData
      })

  }

}

export default classService