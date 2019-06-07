/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 */

import educationManagementController from '../../interfaces/controllers/educationManagementController'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'

 const onClass =  {
    teacherUpdate: async(params) => { //schoolName, schoolID, notificationID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        // classID to teacher document
        educationManagementController.assignClassIDtoTeacher(params.schoolName, params.schoolID, params.clasasAlias, params.classID,params.teacherRef).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: class data to school document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: adding class data to school document')
            winstonLogger.error(e)

        })

    },
    //
    created: async(params) => { //schoolName, schoolID, notificationID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        educationManagementController.addClasstoSchool(params.schoolName, params.schoolID, params.classData).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: class data to school document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: adding class data to school document')
            winstonLogger.error(e)

        })

    },
    //
    deleted: async(params) => { //schoolName, schoolID, notificationID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))
        
        educationManagementController.removeClassfromSchool(params.schoolName, params.schoolID, params.classData).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: class data from school document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: class data from school document')
            winstonLogger.error(e)

        })

    },

}

export default onClass