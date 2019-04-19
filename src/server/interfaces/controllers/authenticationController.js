/*
 * #k_infinityIII@Echwood
 *
 * authenticationController: ()
 *
 *Functions:
 *
 * Authenticate Users
 * create / verify session
 *
 */

import parentAdapter from '../db/parentAdapter';
import studentAdapter from '../db/studentAdapter';
import teacherAdapter from '../db/teacherAdapter';
import schoolAdminAdapter from '../db/schoolAdminAdapter';

const authenticationController = {

  // student
    authenticateStudent(email, password, username, clientID) {

      console.log('authenticationController handling login');

      return studentAdapter.authenticate(email, password, username, clientID);

  },

    logoutStudent(Token) {

      console.log('authenticationController handling logout');

    return studentAdapter.logout(Token);

  },

  // Parent
    authenticateParent(email, password) {

      console.log('authenticationController handling login');

      return parentAdapter.authenticate(email, password);

  },

    logoutParent(Token) {

      console.log('authenticationController handling logout');

      return parentAdapter.logout(Token);

  },

  // Teacher
    authenticateTeacher(email, password) {

      console.log('authenticationController handling login');

      return teacherAdapter.authenticate(email, password);

  },

    logoutTeacher(Token) {

      console.log('authenticationController handling logout');

      return teacherAdapter.logout(Token);

  },
  // SchoolAdmin
  authenticateSchoolAdmin(email, password) {

    console.log('authenticationController handling login');

    return schoolAdminAdapter.authenticate(email, password);

},

  logoutSchoolAdmin(Token) {

    console.log('authenticationController handling logout');

    return schoolAdminAdapter.logout(Token);

},

};

export default authenticationController;