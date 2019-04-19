/*
 * #k_infinityIII@Echwood
 *
 * parentAdapter: () : provides a layer to interface with the database
 * implementations could be changed to adapt at this layer
 *
 *Functions:
 *
 * sinks parent data into database
 *
 */


import authorisationService from '../../domains/services/authorisationService';
import parentService from '../../domains/services/parentService';


const parentAdapter = {

  // Adds new user to the database with email and password
  async persist(email, password, username, clientID) {

    let response = null;

    await parentService.createNewEmailUser(email, password, username, clientID).
    then((resolve) => {

      // Creation Succeeded
      response = Promise.resolve(resolve);

    }).
    catch((err) => {

      response = {'result':false,'Token':null,'message':err.toString()};
      
      return Promise.reject(response);

    });

    return response;

  },
  // Authenticates already existing user
  async authenticate(email, password, username, clientID) {
  
    let response = null;

    await parentService.authenticateParent({email, password, username}, clientID).
    then((resolve) => {

      // Authentication succeeded
        response = Promise.resolve(resolve);

    }).
    catch((err) => {

      response = {'result':false,'Token':null,'message':err.toString()};

    });

    return response;

  },
  // authorise an authenticated user
  async authorise(accessToken) {
  
    let response = null;

    // 
    await authorisationService.authoriseToken(accessToken).
    then((resolve) => {

      // Authorization succeeded
        response = Promise.resolve(resolve);

    }).
    catch((err) => {

      response = {'result': false};

    });

    return response;

  },
  // Logout an authenticated user
  async logout(accessToken) {
  
    let response = null;

    await parentService.logoutParent(accessToken).
    then((resolve) => {

      // Lougout succeeded
      response = Promise.resolve(resolve);

    }).
    catch((err) => {

      reponse = {'response': false};

    });

    return response;

  }

};

export default parentAdapter;