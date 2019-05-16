/*
 * #k_infinityIII@Echwood
 *
 * JwtAccesTokenManager: (implementation)
 *
 *    generates | decodes signed (JWT) token
 *
 */

import config from '../../Infrastructure/utils/config'
import jwt from 'jsonwebtoken'
import winstonLogger from '../../Infrastructure/utils/winstonLogger';

const privateKey = config.tokenPrivateKey
const publicKey = config.tokenPublicKey

export default class {
  
  // Generate a new access token for an authenticated user | from a client
  static generate(payload, options) {
      
    let Token = null

    winstonLogger.info('PrivateKey for Token encryption')
    winstonLogger.info(privateKey)
      winstonLogger.info('Token Data')
      winstonLogger.info(JSON.stringify(payload))
      winstonLogger.info('Token Options')
      winstonLogger.info(options)

      try {
           
        Token = jwt.sign({
          email: payload.email,
          name: payload.Name
          },
          privateKey,
          options
        )

      } catch (e) {
        
        winstonLogger.error('Error generating Token')
        winstonLogger.error(e)

      }
       
      winstonLogger.info('Token')
      winstonLogger.info(JSON.stringify(Token))

      return Token

  }

  static verify(accessToken, options) {

      //equally decodes the token
      return jwt.verify(accessToken, publicKey, options)

  }
  
  static destroy(accessToken) {

    return jwt.destroy()

  }

}
