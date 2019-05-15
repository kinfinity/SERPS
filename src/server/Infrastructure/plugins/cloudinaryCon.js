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
import winstonLogger from '../utils/winstonLogger'
// import cloudinary from 'cloudinary'
const cloudinary = require('cloudinary').v2

// cloudinary.config({ 
//     cloud_name: config.cloudinaryName,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
//     api_key: config.cloudinaryAPIKey, 
//     api_secret: config.cloudinarySecret 
// })

const cloudinaryCon = {

    async uploadSchoolLogo(Logo){

        cloudinary.v2.upload(
            Logo, 
            {
                overwrite: true,
                invalidate: true,
                width: 810, height: 456, crop: "fill"
            }, 
            (e,res) => {
                if( e != null ){
                    
                    winstonLogger.error(e)

                }
                winstonLogger.info(res)
                return res
            })

    }, 
    async uploadSchoolImage(Image){
        cloudinary.v2.upload(
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
    }

}

export default cloudinaryCon