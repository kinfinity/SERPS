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
      var options = {
        issuer: config.serverID,
        subject: 'accessToken',
        expiresIn: '12h',
   //     algorithm: 'RS256'
        };
      options.audience = 'serps';// verify

      return this.accessTokenManager.generate(payload, options);

  }

}