/**
 * #k_infinityIII@Echwood
 *
 * tokenService: () : TokenModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *      create | insert
 *      remove | delete
 *      authorise 
 *
 */

import DestroyAccessToken from '../../app/usecase/DestroyAccessToken'
import GetAccessToken from '../../app/usecase/GetAccesToken'
import jwtAccessTokenManager
  from '../../interfaces/security/jwtAccessTokenManager'


const tokenService = {

  /*
   * generate new token for authenticated user
   */
  async generateToken(payload) {

    // Return a boolean(true) and signed JWT
    const Token = new GetAccessToken(jwtAccessTokenManager).
    execute(payload)

    return Token

  },

  /*
   * decode token for authorisation
   */
  async decodeToken(aToken) {

    tokenService.tokenExists(aToken)
    // Return a decoded token 
    const decodedToken = new DecodeAccessToken(jwtAccessTokenManager).
    execute(aToken)

    return decodedToken

  }

}

export default tokenService