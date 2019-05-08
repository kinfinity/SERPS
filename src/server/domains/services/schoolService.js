/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * schoolService: () : SchoolModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *      create | insert
 *          -> createNewEmailUser(email, password)
 *              : checks if user exists first with email [.schoolExists(email)]
 *              : creates new user with email
 *                  and password [_schoolModel.create(email,password)]
 *              : authenticates the user and sends back a token(string),
 *                  message (string), and result(boolean)
 *      remove | delete
 *      findBy | search
 *          -> authenticateUser(email, password)
 *              : searches the database for the user and compares password
 *              : it then takes the email and password from the database
 *              : creates a jwt with the email and password and sends back
 *          ->schoolExists
 *              : checks if an email exists in the database
 *      get    | retrieve
 *             | update
 *
 *
 */

import Password from '../utils/password';
import SchoolModel from '../models/SchoolModel';
import tokenService from '../services/tokenService';


const schoolService = {

  // handle for the SchoolModel
  _schoolModel: SchoolModel,
  // Create new user
  async createNewEmailUser(Name,email,password,motto,Address,Logo,Images) {

    console.log('inside schoolService');
    // Holds return data for this fucntion
    let response = null;
    // Check if user exists first returns promise resolved to true or false
    await schoolService.schoolExists({email,Name}).
    then((result) => {

      // Email exists in database
        response = result;

    }).
    catch((e) => {
      console.log('existence error');
      console.log(e);
      Promise.resolve({'result': false, 'Token': null, 'message': e})
    });
    // Becomes true if user already exists and we kick out of function
    if (response) {

      // Return to higher scope if there's a user
      return Promise.resolve({'result': false, 'Token': null, 'message': err.toString()});

    }
    // Create static Data for user
      const schoolData = {
        Name,
        email,
        password,
        motto,
        Address,
        Logo,
        Images
    };
    const ipassword = schoolData.password;
    // Hash user password on first save
    await Password.hash(ipassword).
    then((hashedPassword) => {

      // Append Hashed password to static user Data
      schoolData.password = hashedPassword;
      // Create new user model
      const school = new SchoolModel(schoolData);
    
      // Save new user
      school.
      save().
      then(() => {

        // Succeeded in saving new user to DB
        console.log('SCHOOL CREATED:::');

      }).
      catch((err) => {

        console.log(`SCHOOL NOT CREATED:::${err}`);

        return Promise.resolve({
          result: false,
          Token: {},
          message: err.toString()
        });

      });

    }).catch((err) => {

      console.log(`SCHOOL PASSWORD NOT HASHED:::${err}`);
        
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
    schoolData.password = ipassword;
    // Authenticate user after signup
    await schoolService.authenticateUser(schoolData).
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
  async authenticateUser(schoolData) {

    let response = null;
    let response1 = null;
    let response2 = null;
    let tempData = null;
    let id = null;

    // Try email
    await schoolService.
    _schoolModel.
    findOne({email: schoolData.email}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        console.log('email found');
        tempData = Data;
        console.log(Data);
        response1 = true;
        id = schoolData.email;

      }

    }).
    catch((err) => {
      
      //
      response1 = false

    });

    // Try Name
    await schoolService.
    _schoolModel.
    findOne({Name: schoolData.Name}).
    then((Data) => {

      // Get data from DB
      if(Data) {

        console.log('Name found');
        tempData = Data;
        console.log(Data);
        response2 = true;
        id = schoolData.Name;

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
        message: 'Name +/- email does not exist'
      });

      return response;

    }
    // User exists -> check password correspondence with bcrypt
    let res = null;
  
    await Password.compare(schoolData.password, tempData.password).
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
          Name: tempData.Name
    }));

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
  async schoolExists(schoolE) {

    let eeResult = null;
    let eeResult1 = null;
    let eeResult2 = null;

    // Check email
    await schoolService.
    _schoolModel.
    findOne({email: schoolE.email}).
    then((Data) => {

      console.log(`checking data base for school with email `);
      if(Data){
  
        if (Data.length === 0) {

          console.log('no school with email exists');
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
    // Check Name
    await schoolService.
    _schoolModel.
    findOne({Name: schoolE.Name}).
    then((Data) => {

      console.log(`checking data base for school Name`);
      if(Data) {

        if (Data.length === 0) {

          console.log('no school exists with Name ');
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
  async initPasswordReset(schoolE) {

    // Email exists result
    let response0 = null;

    // Ensure email exists in database
    await schoolService.schoolExists(schoolE).
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
    await schoolService
      ._schoolModel.update(verificationPack)
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
    await schoolService._schoolModel.findOne({
            email,
      verificationCode,
        })
      .then((schoolData) => {

        console.log('schoolData : ');
        console.log(schoolData);
        // Update passwordfied
          schoolData.password = newPassword;
        // Delete the temporaryData
        schoolData.verificationCode = null;
        schoolData.verificationCodeExpiration = null;
        console.log('new schoolData : ');
        schoolData.save()
          .catch((err) => {

              console.log('error updating password');
              console.log(err);

          });
        console.log(schoolData);


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
      await schoolService._schoolModel.findOne(resetToken)
      .then((schoolData) => {

        console.log('schoolData : ');
          console.log(schoolData);
        // Update passwordfied
          schoolData.password = newPassword;
        // Delete the temporaryData
          schoolData.verificationCode = null;
          schoolData.verificationCodeExpiration = null;

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

export default schoolService;