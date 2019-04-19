/**
 * #k_infinityIII@Echwood
 *
 * config : () :
 *      load from .env with dotenv
 */
const path = require('path');

require('dotenv').config({path: path.join(__dirname, '../../../../.env')});

const config = {

  serverPort: process.env.serverPORT,
  dbName: process.env.DB_NAME,
  dbURI: process.env.DB_CON,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  auth0Domain: process.env.AUTH0_DOMAIN,
  auth0client: process.env.AUTH0_CLIENT_ID,
  auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
  gmailAddress: process.env.GMAILADD,
  gmailPassword: process.env.GMAILPWD,
  nexmoApiKey: process.env.NEXMO_API_KEY,
  nexmoApiSecret: process.env.NEXMO_API_SECRET,
  cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
  serverID: process.env.serverID
};

export default config;