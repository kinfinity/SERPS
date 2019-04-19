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
import config from '../utils/config';
// Node js mailing library
import cloudinary from 'cloudinary';

// Configure smtp transport machanism for password reset email
const cloudinaryCon = cloudinary.config({ 
    cloud_name: config.cloudinaryName, 
    api_key: config.cloudinaryAPIKey, 
    api_secret: config.cloudinarySecret 
});

console.log(cloudinaryCon);

export default cloudinaryCon;
