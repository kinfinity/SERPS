/*
 * #k_infinityIII@Echwood
 *
 * JwtAccesTokenManager: (implementation)
 *
 *    generates | decodes signed (JWT) token
 *
 */

import config from '../../Infrastructure/server/utils/config';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export default class {
  
  // Generate a new access token for an authenticated user | from a client
  static generate(payload, options) {

      //
      return jwt.sign(payload, this.privateKey,options);

  }

  static verify(accessToken, options) {

      //
      return jwt.verify(accessToken, this.publicKey, options);

  }
  
  static decode(accessToken) {

    return jwt.decode(accessToken, this.privateKey);

  }

};
