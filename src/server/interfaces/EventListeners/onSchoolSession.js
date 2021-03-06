/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 */

import schoolSessionController from '../../interfaces/controllers/schoolSessionController'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'

 const onSchoolSession =  {
    created: async(params) => { //schoolName, schoolID, schoolSessionID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        schoolSessionController.addSession(params.SchoolName, params.schoolID, params.schoolSessionID).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: sessionID to school document')
                    winstonLogger.info(JSON.stringify(res,null,4))
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: appending sessionID to school document')
            winstonLogger.error(e)

        })

    },
    //
    deleted: async(params) => { //schoolName, schoolID, sessionID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))
        
        schoolSessionController.removeSession(params.SchoolName, params.schoolID, params.sessionID).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: sessionID to school document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: appending sessionID to school document')
            winstonLogger.error(e)

        })

    },
    update_AccessCode: async(params) => { //schoolName, schoolID, sessionName

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))
        
        schoolSessionController.update_AccessCode(params.schoolName, params.schoolID, params.sessionName).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: public_ACCESS_CODE in school document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: public_ACCESS_CODE in school document')
            winstonLogger.error(e)

        })

    },

}

export default onSchoolSession