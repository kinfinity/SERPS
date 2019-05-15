/*
 * #k_infinityIII@Echwood
 *
 * JwtAccesTokenManager: (implementation)
 *
 *    generates | decodes signed (JWT) token
 *
 */

import config from '../../Infrastructure/utils/config'
import JWTR from 'jwt-redis'
import Redis from 'ioredis'

const redis = new Redis()
const jwtr = new JWTR(redis)

const privateKey = config.tokenPrivateKey
const publicKey = config.tokenPublicKey

export default class {
  
  // Generate a new access token for an authenticated user | from a client
  static generate(payload, options) {
      
      //
      return jwtr.sign(payload, privateKey,options)

  }

  static verify(accessToken, options) {

      //equally decodes the token
      return jwtr.verify(accessToken, publicKey, options)

  }
  
  static destroy(accessToken) {

    return jwtr.destroy()

  }

}
