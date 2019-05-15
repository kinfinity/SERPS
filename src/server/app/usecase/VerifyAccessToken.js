/*
 * #k_infinityIII@Echwood
 *
 * VerifyAccesToken: () :
 *      Promises Bluebird
 *
 */
import Promise from 'bluebird';

export default class {

  constructor(accessTokenManager) {

        this.accessTokenManager = accessTokenManager;

    }

    execute(accessToken) {

      const verified = this.accessTokenManager.verify(accessToken);

      if (!verified) {

        return Promise.reject(new Error('Invalid access token'));

    }
    return verified

  }

}