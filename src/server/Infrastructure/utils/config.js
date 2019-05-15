/**
 * #k_infinityIII@Echwood
 *
 * config : () :
 *      load from .env with dotenv
 */
const path = require('path');
const fs = require('fs')

require('dotenv').config({path: path.join(__dirname, '../../../../.env')});

// try {
  
//   const _tokenPrivateKey = fs.readFileSync('../certs/token/private.key','utf-8') 
//   const _tokenPublicKey = fs.readFileSync('../certs/token/public.key','utf-8')
  
// } catch (e) {
//   console.log('error getting permission files' + e.toString())
// }

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
  serverID: process.env.serverID,
  tokenPrivateKey:  process.env.TOKEN_PRIVATEKEY,
  tokenPublicKey:  process.env.TOKEN_PUBLICKEY
};

export default config;