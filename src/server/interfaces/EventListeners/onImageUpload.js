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
            profileManagementController.updateSchool(params.schoolName, params.schoolID, {Logo: params.logoURL}).
            then((res) => {
                if(res.Data == false){

                    // if it didn't persist try again Or serialize if DB is down ... 
                    profileManagementController.updateSchool(params.schoolName, params.schoolID, {Logo: params.logoURL})

                }
                //validated

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