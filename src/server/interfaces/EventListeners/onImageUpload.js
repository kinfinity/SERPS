/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 */

import profileManagementController from '../../interfaces/controllers/profileManagementController'
import winstonLogger from '../../Infrastructure/utils/winstonLogger';

 const onImageUpload =  {

    school: {

        Logo: async (params) => { //schoolName, schoolID, logoURL

            //
            winstonLogger.info('Event Launched')
            winstonLogger.info(JSON.stringify(params,null,4))
            profileManagementController.updateSchool(params.schoolName, params.schoolID, {Logo: params.logoURL}).
            then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: schoolLogoUrl')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                // profileManagementController.updateSchool(params.schoolName, params.schoolID, {Logo: params.logoURL})

            

            }).
            catch((e) =>{
    
                winstonLogger.error('ERROR: updating schoolLogoUrl')
                winstonLogger.error(e)
    
            })

        },
        Images: async (params) => {

            //
            winstonLogger.info('Event Launched')
            profileManagementController.updateSchool(params.schoolName, params.schoolID, {Images: params.ImagesURL}).
            then((res) => {
                if(res.Data == false){

                    // if it didn't persist try again Or serialize if DB is down ... 
                    profileManagementController.updateSchool(params.schoolName, params.schoolID, {Images: params.ImagesURL})

                }
                //validated

            }).
            catch((e) =>{
    
                winstonLogger.error('ERROR: updating school images urls')
                winstonLogger.error(e)
    
            })

        },
        //

    },
    parent: {

        Logo: async (params) => {},
        Images: async (params) => {},

    },
    teacher: {

        Logo: async (params) => {},
        Images: async (params) => {},

    },
    student: {

        Logo: async (params) => {},
        Images: async (params) => {},

    }

}

 export default onImageUpload