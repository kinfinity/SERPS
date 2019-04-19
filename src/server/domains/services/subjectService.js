/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * subjectService: () : SubjectModel
 *
 *  implements fucntions necessary for model manipulation
 *
 * Fucntions:
 *      create | insert
 *      remove | delete
 *      findBy | search
 *      get    | retrieve
 *             | update
 *
 *
 */

import SubjectModel from '../models/subjectModel';
import tokenService from '../services/tokenService';


const subjectService = {

  // handle for the SubjectModel
  _subjectModel: SubjectModel,
  // Create new class
  async createNewSubject(key, clientID) {

    console.log('inside subjectService');
    // Holds return data for this fucntion
    let response = null;
    // Check if class exists first returns promise resolved to true or false
    await subjectService.subjectExists({alias, name}).
    then((result) => {

      // Email exists in database
        response = result;

    }).
    catch((err) => Promise.resolve({'result': false, 'message': err.toString()}));
    // Becomes true if class already exists and we kick out of function
    if (response) {

      // Return to higher scope if there's a user
      return Promise.resolve({'result': false, 'message': err.toString()});

    }
    
    return response;

  },
   /*
   * Checks if the class is in the Database without returning anyData
   * returns a boolean based on availability
   */
  async subjectExists(subjectE) {

    let eeResult = null;
    let eeResult1 = null;
    let eeResult2 = null;

    // Check class
    await subjectService.
    _subjectModel.
    findOne({alias: subjectE.alias}).
    then((Data) => {

      console.log(`checking data base for class`);
      if(Data){
  
        if (Data.length === 0) {

          console.log('no such class exists');
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
    // Check class name
    await subjectService.
    _subjectModel.
    findOne({name: subjectE.name}).
    then((Data) => {

      console.log(`checking data base for user`);
      if(Data) {

        if (Data.length === 0) {

          console.log('no such class exists');
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
   * updates information on a class
   */
  async updateSubject(subjectE) {
    
  },

  /*
   * updates information on a class
   */
  async removeSubject(subjectE) {
    
  },

    /*
   * updates information on a class
   */
  async deleteSubject(subjectE) {
    
  },

};

export default subjectService;