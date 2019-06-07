/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 */

import educationManagementController from '../../interfaces/controllers/educationManagementController'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'

 const onLectureNote =  {
    uploaded: async(params) => { 

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        // classID to teacher document
        educationManagementController.addLectureNoteUrl(
            params.schoolName,
            params.schoolID,
            params.classAlias,
            params.teacherID,
            params.subjectName,
            params.lectureNoteTitle,
            params.lectureNoteUrl
        ).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: update link to teacher and subject document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: updating link to teacher and subject document')
            winstonLogger.error(e)

        })

    },
    //
}

export default onLectureNote
