/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 */

import educationManagementController from '../../interfaces/controllers/educationManagementController'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'

 const ontimeTable =  {

    created: async(params) => { //

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        educationManagementController.addtimeTable(
            params.schoolName, 
            params.schoolID, 
            params.classAlias,
            params.timeTableID
        ).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: adding timeTableID to class document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: appending timeTableID to class document')
            winstonLogger.error(e)

        })

    },

}

export default ontimeTable