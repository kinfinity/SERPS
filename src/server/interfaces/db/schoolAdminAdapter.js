/*
 * #k_infinityIII@Echwood
 *
 * schoolAdminAdapter: () : provides a layer to interface with the database
 * implementations could be changed to adapt at this layer
 *
 *Functions:
 *
 * sinks schoolAdmin data into database
 *
 */


import authorisationService from '../../domains/services/authorisationService';
import schoolAdminService from '../../domains/services/schoolService';


const schoolAdminAdapter = {

  // Adds new school to the database
  async persist(params) {

    
    /**
     *      Name: req.body.Name,
     *      email: req.body.email
     *      password: req.body.password
            motto: req.body.motto,
            Address: req.body.Address,
            Logo: req.body.logoLink,
            Images: [req.body.imagesLinks] // 1-3
     */
    let response = null;

    await schoolAdminService.createNewEmailUser(
        params.Name,
        params.email,
        params.password,
        params.motto, 
        params.Address, 
        params.Logo,
        params.Images
    ).
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
  async authenticate(email, password, username) {
  
    let response = null;

    await schoolAdminService.authenticateUser({email, password, username}).
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

    await schoolAdminService.logoutParent(accessToken).
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

export default schoolAdminAdapter;