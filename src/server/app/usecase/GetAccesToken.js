/*
 * #k_infinityIII@Echwood
 *
 * GetAccesToken: () :
 *
 */
import fs from 'fs';
import config from '../../Infrastructure/utils/config';

export default class {

  constructor(accessTokenManager) {

    this.accessTokenManager = accessTokenManager;
    // Dfs.readSync('private.key', 'utf8') |
    this.accessTokenManager.privateKey = config.jwtSecretKey;

    }

    execute(payload) {

      //
      const options = {
        issuer: config.serverID,
        subject: 'accessToken',
        expiresIn: '1h',
   //     algorithm: 'RS256',
        audience: 'serp'
        };
      options.audience = 'serps';// verify

      return this.accessTokenManager.generate(payload, options);

  }

}