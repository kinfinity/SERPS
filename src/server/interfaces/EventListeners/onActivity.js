/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 */

import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import educationManagementController from '../controllers/educationManagementController'

 const onActivity =  {

    updateTeacher: async(params) => { //schoolName, schoolID, schoolSessionID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        educationManagementController.updateActivityTeacher(params.activityAlias, params.activityID, params.teacherRef, params.oldteacherRef).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: activityID in teacher documents')
                    winstonLogger.info(JSON.stringify(res,null,4))
                    //validated 
                }
                // if it didn't persist try again Or serialize if DB is down ... 

        }).
        catch((e) =>{

            winstonLogger.error('ERROR: fixing activityID in teacher documents')
            winstonLogger.error(e)

        })

    },
    created: async(params) => { //schoolName, schoolID, schoolSessionID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        educationManagementController.addActivitytoSchool(params.SchoolName, params.schoolID, params.activityAlias, params.activityID).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: activity to school document')
                    winstonLogger.info(JSON.stringify(res,null,4))
                    //validated
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: appending activity to school document')
            winstonLogger.error(e)

        })

    },
    //
    deleted: async(params) => { //schoolName, schoolID, sessionID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))
        
        schoolSessionController.removeActivityfromSchool(params.SchoolName, params.schoolID, params.activityAlias, params.activityID).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('REMOVE: activity from school document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: removing activity from school document')
            winstonLogger.error(e)

        })

    }

}

export default onActivity