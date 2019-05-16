/*
 * #k_infinityIII@Echwood
 *
 * GetAccesToken: () :
 *
 */
import fs from 'fs'
import config from '../../Infrastructure/utils/config'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'

export default class {

  constructor(accessTokenManager) {

    this.accessTokenManager = accessTokenManager
    winstonLogger.info('Access TokenManager set')

    }

    execute(payload) {

      winstonLogger.info('encoding payload into Token')
      //
      const options = {
        issuer: config.serverID,
        subject: 'accessToken',
        expiresIn: '1h',
   //     algorithm: 'RS256',
        audience: 'serp'
        }
      options.audience = 'serps'// verify

      return this.accessTokenManager.generate(payload, options)

  }

}