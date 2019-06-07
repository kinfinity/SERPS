/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 */

import educationManagementController from '../../interfaces/controllers/educationManagementController'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'

 const onNotification =  {

    createdC: async(params) => { //

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        educationManagementController.addSubjecttoClass(params.schoolName, params.schoolID, params.subjectName, params.subjectID, params.classAlias).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: adding subject to class document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: appending subject to class document')
            winstonLogger.error(e)

        })

    },
    deletedC: async(params) => { //

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        educationManagementController.removeSubjectfromClass(params.schoolName, params.schoolID, params.subjectName, params.subjectID, params.classAlias).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: removing subject from subjectHolder document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: removing subject from subjectHolder document')
            winstonLogger.error(e)

        })

    },
    //
    createdH: async(params) => { //

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        educationManagementController.addSubjecttoHolder(params.schoolName, params.schoolID, params.subjectName, params.subjectID, params.classAlias).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: adding subject to subjectHolder document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: appending subject to subjectHolder document')
            winstonLogger.error(e)

        })

    },
    deletedH: async(params) => { //

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        educationManagementController.removeSubjectfromHolder(params.schoolName, params.schoolID, params.subjectName, params.subjectID, params.classAlias).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: removing subject from subjectHolder document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: removing subject from subjectHolder document')
            winstonLogger.error(e)

        })

    },
    //
    holderCreated: async(params) => { //

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))

        educationManagementController.addSubjectHoldertoSchool(params.schoolName, params.schoolID, params.subjectName, params.subjectID).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('UPDATE: adding subjectHolder to schoolSession document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: appending subjectHolder to schoolSession document')
            winstonLogger.error(e)

        })

    },
    //
    holderDeleted: async(params) => { //

        winstonLogger.info('Event Launched')
        winstonLogger.info(JSON.stringify(params,null,4))
        
        educationManagementController.removeSubjectHolderfromSchool(params.schoolName, params.schoolID, params.subjectName, params.sujectID).
        then((res) => {


                if(res !== null){

                    winstonLogger.info('REMOVE: subjectHolder from school document')
                    winstonLogger.info(res)
                    //validated
                    
                }
                // if it didn't persist try again Or serialize if DB is down ... 
                
        }).
        catch((e) =>{

            winstonLogger.error('ERROR: removing subjectHolder from school document')
            winstonLogger.error(e)

        })

    },

}

export default onNotification