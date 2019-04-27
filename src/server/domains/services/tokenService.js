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

import DecodeAccessToken from '../../app/usecase/DecodeAccessToken';
import GetAccessToken from '../../app/usecase/GetAccesToken';
import TokenModel from '../models/TokenModel';
import jwtAccessTokenManager
  from '../../interfaces/security/jwtAccessTokenManager';


const tokenService = {

  _tokenModel: TokenModel,
  /*
   * Token style authorization for requests
   * Every request goes through but is only
   *  validated if the user posses a valid token
   */
  async tokenExists(Token  ) {

    // Find in DB
    tokenService._tokenModel.find({token: Token}).
    then((result) => {
      
      console.log('finding token');
    
    }).catch((err) => {
      
      Promise.reject(err);

    });

  },

  /*
   * generate new token for authenticated user
   */
  async generateToken(payload) {

    // Return a boolean(true) and signed JWT
    const Token = new GetAccessToken(jwtAccessTokenManager).
    execute(payload);

     // Create static Data for userToken
     const TokenData = {
      token: Token
    };
   
    tokenService.saveToken(TokenData);

    return Token;

  },

  /*
   * decode token for authorisation
   */
  async decodeToken(aToken) {

    tokenService.tokenExists(aToken);
    // Return a decoded token 
    const decodedToken = new DecodeAccessToken(jwtAccessTokenManager).
    execute(aToken);

    return decodedToken;

  },

  /*
   * save authenticated Token to DB
   */
  async saveToken(TokenData) {

     // Create a new userToken to be saved to Database
     const mToken = tokenService._tokenModel(TokenData);

     mToken.
     save().
     then((Data) => {
 
       // Succeeded in saving new user to DB
       console.log('TOKEN ADDED TO DB:::');
       console.log(Data);
 
     }).
     catch((err) => {
 
       console.log(`TOKEN NOT ADDED TO DB:::${err}`);
 
       return Promise.resolve({});
  
     });

  },

  /*
   * remove Token from DB
   */
  async killToken(Token) {

    //
    console.log(Token);
    console.log('handling token deletion');
    await tokenService._tokenModel.findOneAndRemove  ({token:Token}).
    then((result) => {
 
      // Succeeded in saving new user to DB
      console.log('DELETING TOKEN FROM DB:::');
      console.log(result);

    }).
    catch((err) => {

      console.log(`TOKEN NOT DELETED FROM DB:::${err}`);

    });;

  }

};

export default tokenService;