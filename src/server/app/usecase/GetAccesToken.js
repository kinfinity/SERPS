/*
 * #k_infinityIII@Echwood
 *
 * GetAccesToken: () :
 *
 */
import fs from 'fs';
import config from '../../Infrastructure/server/utils/config';

export default class {

  constructor(accessTokenManager) {

    this.accessTokenManager = accessTokenManager;
    // Dfs.readSync('private.key', 'utf8') |
    this.accessTokenManager.privateKey = config.jwtSecretKey;

    }

    execute(payload, clientID) {

      //
      var options = {
        issuer: config.serverID,
        subject: 'accessToken',
        expiresIn: '12h',
   //     algorithm: 'RS256'
        };
      options.audience = clientID;

      return this.accessTokenManager.generate(payload, options);

  }

}