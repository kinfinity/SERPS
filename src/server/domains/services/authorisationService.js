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

import Auth0Strategy from 'passport-auth0';
import tokenService from './tokenService';
import passport from 'passport';
import passportauth0 from 'passport-auth0';
console.log(passportauth0);

var strategy = new Auth0Strategy({
    domain:       'your-domain.auth0.com',
    clientID:     'your-client-id',
    clientSecret: 'your-client-secret',
    callbackURL:  '/callback'
   },
   function(accessToken, refreshToken, extraParams, profile, done) {
     // accessToken is the token to call Auth0 API (not needed in the most cases)
     // extraParams.id_token has the JSON Web Token
     // profile has all the information from the user
     console.log(accessToken);
     console.log(refreshToken);
     console.log(profile);
     return done(null, profile);
   }
 );
 
passport.initialize();
passport.session();
passport.use(strategy);
//console.log(passport.Strategy.name);

const authorisationService = {

    async init(){
        passport.initialize();
        passport.session();
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

authorisationService.authoriseToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlldGFub3RoZXJtYW5AYW5vdGhlcm9uZS5jb20iLCJ1c2VybmFtZSI6InlldGFub3RoZXIiLCJpYXQiOjE1NDY5NDQ4NjksImV4cCI6MTU0Njk4ODA2OSwiYXVkIjpbXSwiaXNzIjoiNHJybTUzcnYzcjNjaHcwMGQiLCJzdWIiOiJhY2Nlc3NUb2tlbiJ9.U8QAwjhbPWMsTXXcob5ypvK6UZ_hKJB1X_Iv0EWn6cg');

export default authorisationService;