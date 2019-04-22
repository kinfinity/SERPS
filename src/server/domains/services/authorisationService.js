/**
* #k_infinityIII@Echwood
*
* authorisationService: () 
*
*  implements fucntions necessary for model manipulation
*
* Fucntions:
*      authoriseToken()
*
*/

import tokenService from './tokenService';

const authorisationService = {

    async init(){
    },
 _tokenService: tokenService,
 /*
  * Token style authorization for requests
  * Every request goes through but is only
  *  validated if the user posses a valid token
  */
 async authoriseToken(accessToken) {

  // Find in DB and Decode Tokekn
  const decodedToken = authorisationService._tokenService.decodeToken(accessToken);
  console.log(decodedToken);

  // check if expired  and crearte a shortID access token
  if(_tokenIsExpired(decodedToken)){

    return false;

  }
  // authorise or kill
  
  // validate for set of API (user | restuarant | waiter)

 },

 /** */
 async _tokenIsExpired(Token){

    if(Token.exp <= Text.iat) {

      return true;

    }
    return false;

  }

};

//authorisationService.authoriseToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlldGFub3RoZXJtYW5AYW5vdGhlcm9uZS5jb20iLCJ1c2VybmFtZSI6InlldGFub3RoZXIiLCJpYXQiOjE1NDY5NDQ4NjksImV4cCI6MTU0Njk4ODA2OSwiYXVkIjpbXSwiaXNzIjoiNHJybTUzcnYzcjNjaHcwMGQiLCJzdWIiOiJhY2Nlc3NUb2tlbiJ9.U8QAwjhbPWMsTXXcob5ypvK6UZ_hKJB1X_Iv0EWn6cg');

export default authorisationService;