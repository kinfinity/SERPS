/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * parentService: () : ParentModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *      create | insert
 *          -> createNewEmailUser(email, password)
 *              : checks if user exists first with email [.parentExists(email)]
 *              : creates new user with email
 *                  and password [_parentModel.create(email,password)]
 *              : authenticates the user and sends back a token(string),
 *                  message (string), and result(boolean)
 *      remove | delete
 *      findBy | search
 *          -> authenticateUser(email, password)
 *              : searches the database for the user and compares password
 *              : it then takes the email and password from the database
 *              : creates a jwt with the email and password and sends back
 *          ->parentExists
 *              : checks if an email exists in the database
 *      get    | retrieve
 *             | update
 *
 *
 */

import Password from '../utils/password';
import ParentModel from '../models/ParentModel';
import tokenService from './tokenService';


const parentService = {

  // handle for the ParentModel
  _parentModel: ParentModel,
  // Create new user
  async createNewEmailUser(email, ipassword, username, clientID) {

    console.log('inside parentService');
    // Holds return data for this fucntion
    let response = null;
    // Check if user exists first returns promise resolved to true or false
    await parentService.parentExists({email, username}).
    then((result) => {

      // Email exists in database
        response = result;

    }).
    catch((err) => Promise.resolve({'result': false, 'Token': null, 'message': err.toString()}));
    // Becomes true if user already exists and we kick out of function
    if (response) {

      // Return to higher scope if there's a user
      return Promise.resolve({'result': false, 'Token': null, 'message': err.toString()});

    }
    // Create static Data for user
      const parentData = {
        email,
        username
    };
    // Hash user password on first save
    await Password.hash(ipassword).
    then((hashedPassword) => {

      // Append Hashed password to static user Data
      parentData.password = hashedPassword;
      // Create new user model
      const student = new ParentModel(parentData);
    
      // Save new user
      student.
      save().
      then(() => {

        // Succeeded in saving new user to DB
        console.log('USER CREATED:::');

      }).
      catch((err) => {

        console.log(`USER NOT CREATED:::${err}`);

        return Promise.resolve({
          result: false,
          Token: {},
          message: err.toString()
        });

      });

    }).catch((err) => {

      console.log(`USER PASSWORD NOT HASHED:::${err}`);
        
      response = Promise.resolve({
          result: false,
          Token: {},
          message: err.toString()
      });

      return response;

    });

    // Create and use timeout
    const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

    await timeout(1000);
    // Swap back in unhashedPassword for authentication
    parentData.password = ipassword;
    // Authenticate user after signup
    await parentService.authenticateUser(parentData, clientID).
    then((us) => {

      // Succeeded authentication
      Promise.resolve(us).then((result) => {

        // Set response
        response = result;

      });

      return response;

    });

    return response;

  },
  // Authenticate an already existing user
  async authenticateUser(parentData, clientID) {

    let response = null;
    let response1 = null;
    let response2 = null;
    let tempData = null;
    let id = null;

    // Try email
    await parentService.
    _parentModel.
    findOne({email: parentData.email}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        console.log('email found');
        tempData = Data;
        console.log(Data);
        response1 = true;
        id = parentData.email;

      }

    }).
    catch((err) => {
      
      //
      response1 = false

    });

    // Try username
    await parentService.
    _parentModel.
    findOne({username: parentData.username}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        console.log('username found');
        tempData = Data;
        console.log(Data);
        response2 = true;
        id = parentData.username;

      }

    }).
    catch((err) => {

      //
      response2 = false;

    });

    if (response1 == null && response2 == null) {

      // Break out
      console.log(`ERROR AUTHENTICATING :::`);
      // Return false and and empty object
      response = Promise.resolve({
        result: false,
        Token: null,
        message: 'username +/- email does not exist'
      });

      return response;

    }
    // User exists -> check password correspondence with bcrypt
    let res = null;
  
    await Password.compare(parentData.password, tempData.password).
    then((matched) => {
    
      // Password matched
      console.log(`password matched ? ${matched}`);
      res = Promise.resolve(matched);

    }).
    catch((err) => Promise.reject(err));

    if (!res) {


      response = {
        result: false,
        Token: null,
         message: 'we got garbbage from password comparism'
      };

      return response;

    }
    // Return a boolean(true) and signed JWT
    const Token = await Promise.resolve(tokenService.generateToken({
          email: tempData.email,
          username: tempData.username
    },
    clientID
    ));

    // Resolve
    response = Promise.resolve({
      result: true,
      Token,
      message: 'authentication success'
    });

    return response;

  },

  /*
   * Checks if the user is in the Database without returning anyData
   * returns a boolean based on availability
   */
  async parentExists(parentE) {

    let eeResult = null;
    let eeResult1 = null;
    let eeResult2 = null;

    // Check email
    await parentService.
    _parentModel.
    findOne({email: parentE.email}).
    then((Data) => {

      console.log(`checking data base for user`);
      if(Data){
  
        if (Data.length === 0) {

          console.log('no user exists');
          eeResult1 = Promise.resolve(false);


        }

        console.log(`FOUND: ${Data}`);
        eeResult1 = Promise.resolve(true);
      }

    }).
    catch((err) => {

      console.log('error checking database');
      console.log(err);
      eeResult1 = Promise.resolve(false);

    });
    // Check username
    await parentService.
    _parentModel.
    findOne({username: parentE.username}).
    then((Data) => {

      console.log(`checking data base for user`);
      if(Data) {

        if (Data.length === 0) {

          console.log('no user exists');
          eeResult2 = Promise.resolve(false);

        }

        console.log(`FOUND: ${Data}`);
        eeResult2 = Promise.resolve(true);
      }
    }).
    catch((err) => {

      console.log('error checking database');
      console.log(err);
      eeResult2 = Promise.resolve(false);

    });

    return eeResult = eeResult1 || eeResult2;

  },

  /*
   * Init reset send mail ( verification code | reset token)
   * update passresetkey & keyexpiration in schema
   * return result message (boolean)
   */
  async initPasswordReset(parentE) {

    // Email exists result
    let response0 = null;

    // Ensure email exists in database
    await parentService.parentExists(parentE).
    then((result) => {

      // Boolean result
      response0 = result;

    }).
    catch((err) => console.log(err));
    // If no return failure if yes continue
    if (!response0) {

      console.log(`${user} does not belongs to a user in database`);

      return Promise.reject(response0);

    }
    // Initialize and get resetDetails
      const verificationPack = await Password.initReset(email)
      .then((verPack) => {

          Promise.resolve(verPack);

      })
      .catch((err) => {

          Promise.reject(err);

      });

    // Add email to verificationPack
      console.log('this is the RESET data');
    console.log(verificationPack);
      verificationPack.email = email;

    // Add temporaryData(verificationPack) to user's data in DB
    await parentService
      ._parentModel.update(verificationPack)
      .then((response) => {

        console.log('updated: ');
          console.log(response);

      })
      .catch((err) => {

          console.log('error updating the user data with reset data ');
          console.log(err);
        // Return false and and empty object

          Promise.reject(err);

      });

    // Return value
    return Promise.resolve();

  },

  /*
   * Validates verification code and resets the password
   */
    async validatePasswordResetEmail(email, verificationCode, newPassword) {

      console.log('ENTERED VALIDATEPASSWORDRESETEMAIL FUNCTION');
    // Find email and verificationCode combination
    await parentService._parentModel.findOne({
            email,
      verificationCode,
        })
      .then((parentData) => {

        console.log('parentData : ');
        console.log(parentData);
        // Update passwordfied
          parentData.password = newPassword;
        // Delete the temporaryData
        parentData.verificationCode = null;
        parentData.verificationCodeExpiration = null;
        console.log('new parentData : ');
        parentData.save()
          .catch((err) => {

              console.log('error updating password');
              console.log(err);

          });
        console.log(parentData);


      })
      .catch((err) => {

          console.log('ERROR updating PASSWORD');

        return Promise.reject(err);

      });

  },

  /*
   * Uses validated resetToken to reset the password
   */
    async validatePasswordResetToken(resetToken, newPassword) {

      console.log('ENTERED VALIDATEPASSWORDRESETTOKEN FUNCTION');
    // Find email and verificationCode combination
      await parentService._parentModel.findOne(resetToken)
      .then((parentData) => {

        console.log('parentData : ');
          console.log(parentData);
        // Update passwordfied
          parentData.password = newPassword;
        // Delete the temporaryData
          parentData.verificationCode = null;
          parentData.verificationCodeExpiration = null;

      })
      .catch((err) => {

          console.log('ERROR updating PASSWORD');

          return Promise.reject(err);

      });

  },

  /*
   * Destroy the Token object from DB so authorisation would fail for all requests
   */
    async logoutUser(Token) {

    // Destroy the token from database
    console.log('destroy token');
    await Promise.resolve(tokenService.killToken(Token));

  },

};

export default parentService;