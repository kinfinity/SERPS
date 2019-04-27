/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * classService: () : ClassModel
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

import ClassModel from '../models/ClassModel';
import tokenService from '../services/tokenService';


const classService = {

  // handle for the ClassModel
  _classModel: ClassModel,
  // Create new class
  async createNewClass(key) {

    console.log('inside classService');
    // Holds return data for this fucntion
    let response = null;
    // Check if class exists first returns promise resolved to true or false
    await classService.classExists({alias, name}).
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
  async classExists(classE) {

    let eeResult = null;
    let eeResult1 = null;
    let eeResult2 = null;

    // Check class
    await classService.
    _classModel.
    findOne({alias: classE.alias}).
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
    await classService.
    _classModel.
    findOne({name: classE.name}).
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
  async updateClass(classE) {
    
  },

  /*
   * updates information on a class
   */
  async removeClass(classE) {
    
  },

    /*
   * updates information on a class
   */
  async deleteClass(classE) {
    
  },
  async assignClassTeacher(){

  },
  async getClass(){

  },
  async createclassSequence(){
    
  }

};

export default classService;