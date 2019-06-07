/**
 * #k_infinityIII@Echwood
 *
 * cloudinaryCon:
 *  sets up enviroment to upload images and videos
 *
 * Fucntions:
 *
 *
 */
// Config settings
import config from '../utils/config'
import schoolEvent from '../../interfaces/Events/schoolEvents'
import winstonLogger from '../utils/winstonLogger'
import cloudinary from 'cloudinary'
// const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: config.cloudinaryName,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    api_key: config.cloudinaryAPIKey, 
    api_secret: config.cloudinarySecret 
})

const cloudinaryCon = {

    async uploadSchoolLogo(Logo, Name, schoolID){

        let res = null 
        const schoolID0 = schoolID + "Logo"

        winstonLogger.info("CLOUDINARY")
        winstonLogger.info(JSON.stringify(cloudinary.v2,null,4))

        await cloudinary.v2.uploader.upload(
            Logo, 
            {
                folder: Name,
                public_id: schoolID0,
                overwrite: true,
                invalidate: true,
                width: 810, height: 456, crop: "fill"

        }).
        then((result) => {
            res = result
        }).
        catch((e) => {

            winstonLogger.error('Error uploading  Image')
            winstonLogger.error(JSON.stringify(e,null,4))

            return res = false

        })

        // Emit event for LogoPersistence
        try {
            
            winstonLogger.info('Upload Result')
            winstonLogger.info(JSON.stringify(res.url, null,4))
            
            if(res !== null && res !== false){

            }                
                const schoolName = Name
                const logoURL = res.url

                winstonLogger.info('EVENT PARAMETERS')
                winstonLogger.info(Name)
                winstonLogger.info(schoolID)
                winstonLogger.info(res.url)

                // fire Events then send payload
                schoolEvent.
                emit('school-logoUploaded',
                    {// send params
                    schoolName,
                    schoolID, 
                    logoURL
                })

                return res = true


        } catch (e) {
        
            winstonLogger.error('Error emitting event')
            winstonLogger.error(JSON.stringify(e,null,4))

            return res = false

        }
        // Check if the db url was updated else persist the picture to local storage[serialise] and try again later
        

        return res

    }, 
    async uploadSchoolImages(Images){
        cloudinary.v2.uploader.upload(
            Image,
            {

            },
            (e,res) => {
                if( e != null ){
                    
                    winstonLogger.error(e)

                }
                winstonLogger.info(res)
                return res
            })
    },
    //uploadNotificationImages
    async uploadNotificationImages(noteTitle,notificationID,notificationImage, Name, schoolID){

        let res = null 

        winstonLogger.info("CLOUDINARY")
        winstonLogger.info(noteTitle)
        winstonLogger.info(notificationID)
        winstonLogger.info(notificationImage)
        winstonLogger.info(schoolID)
        winstonLogger.info(Name)
    
        await cloudinary.v2.uploader.upload(
            notificationImage, 
            {
                folder: Name+"/"+"notifications",
                public_id: noteTitle,
                overwrite: true,
                invalidate: true,
                // width: 810, height: 456, crop: "fill"
        }).
        then((result) => {
            winstonLogger.info('UPLOADING...')
            winstonLogger.info(JSON.stringify(result,null,4))
            res = result
        }).
        catch((e) => {

            winstonLogger.error('Error uploading  Image')
            winstonLogger.error(JSON.stringify(e,null,4))

            return res = false

        })

        // Emit event for Persistence
        try {
            
            winstonLogger.info('Upload Result')
            winstonLogger.info(JSON.stringify(res.url, null,4))
            
            if(res !== null && res !== false){

            }                
                const schoolName = Name
                const notificationURL = res.url

                winstonLogger.info('EVENT PARAMETERS')
                winstonLogger.info(Name)
                winstonLogger.info(schoolID)
                winstonLogger.info(res.url)

                // fire Events then send payload
                schoolEvent.
                emit('school-notificationImageUploaded',
                    {// send params
                    schoolName,
                    schoolID,
                    notificationID, 
                    notificationURL
                })

                return res = true


        } catch (e) {
        
            winstonLogger.error('Error emitting event')
            winstonLogger.error(JSON.stringify(e,null,4))

            return res = false

        }
        // Check if the db url was updated else persist the picture to local storage[serialise] and try again later

        return res

    },
    //
    async uploadLectureNote(schoolName,schoolID,subjectName,lectureNoteTitle,lectureNoteData,teacherID,classAlias){

        let res = null 

        winstonLogger.info("CLOUDINARY")
        winstonLogger.info(schoolName)
        winstonLogger.info(schoolID)
        winistsonLogger.info(subjectName)
        winstonLogger.info(lectureNoteTitle)
        winstonLogger.info(lectureNoteData)
        winstonLogger.info(teacherID)
        winstonLogger.info(classAlias)
        
        await cloudinary.v2.uploader.upload(// PDF
            lectureNoteData, 
            {
                folder: schoolName+"/"+classAlias+"/"+subjectName,
                public_id: lectureNoteTitle,
                overwrite: true,
                invalidate: true,
                // width: 810, height: 456, crop: "fill"
        }).
        then((result) => {
            winstonLogger.info('UPLOADING...')
            winstonLogger.info(JSON.stringify(result,null,4))
            res = result
        }).
        catch((e) => {

            winstonLogger.error('Error uploading  Image')
            winstonLogger.error(JSON.stringify(e,null,4))

            return res = false

        })

        // Emit event for Persistence
        try {
            
            winstonLogger.info('Upload Result')
            winstonLogger.info(JSON.stringify(res.url, null,4))
            
            if(res){
          
                const lectureNoteURL = res.url

                winstonLogger.info('EVENT PARAMETERS')
                winstonLogger.info(schoolName)
                winstonLogger.info(schoolID)
                winstonLogger.info(lectureNoteTitle)
                winstonLogger.info(lectureNoteData)
                winstonLogger.info(teacherID)
                winstonLogger.info(classAlias)

                // fire Events then send payload
                schoolEvent.
                emit('school-lectureNoteUpdloaded',
                    {// send params
                    schoolName,
                    schoolID,
                    classAlias,
                    teacherID,
                    subjectName,
                    lectureNoteTitle,
                    lectureNoteUrl
                })

                return res = true
            }

        } catch (e) {
        
            winstonLogger.error('Error emitting event')
            winstonLogger.error(JSON.stringify(e,null,4))

            return res = false

        }
        // Check if the db url was updated else persist the picture to local storage[serialise] and try again later

        return res

    }

}

export default cloudinaryCon