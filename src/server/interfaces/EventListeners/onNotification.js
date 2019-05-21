/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 */

import schoolSessionController from '../../interfaces/controllers/schoolSessionController'
import winstonLogger from '../../Infrastructure/utils/winstonLogger';

 const onNotification =  {

    created: async(params) => { //schoolName, schoolID, notificationID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        schoolSessionController.addNotification(params.schoolName, params.schoolID, params.notificationID).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: notificationID to schoolSession document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: appending notificationID to schoolSession document')
            winstonLogger.error(e)

        })

    },
    //
    deleted: async(params) => { //schoolName, schoolID, notificationID

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))
        
        schoolSessionController.removeNotification(params.schoolName, params.schoolID, params.notificationID).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: notificationID to school document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: appending notificationID to school document')
            winstonLogger.error(e)

        })

    },

}

export default onNotification