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

import schoolAdminAdapter from '../db/schoolAdminAdapter';
import parentAdapter from '../db/parentAdapter';
import studentAdapter from '../db/studentAdapter';
import teacherAdapter from '../db/teacherAdapter';
import winstonLogger from '../../Infrastructure/utils/winstonLogger';

const authenticationController = {

  // student
    authenticateStudent(email, password, username, clientID) {

      winstonLogger.info('authenticationController handling login');

      return studentAdapter.authenticate(email, password, username, clientID);

  },

    logoutStudent(Token) {

      winstonLogger.info('authenticationController handling logout');

    return studentAdapter.logout(Token);

  },

  // Parent
    authenticateParent(email, password) {

      winstonLogger.info('authenticationController handling login');

      return parentAdapter.authenticate(email, password);

  },

    logoutParent(Token) {

      winstonLogger.info('authenticationController handling logout');

      return parentAdapter.logout(Token);

  },

  // Teacher
    authenticateTeacher(email, password) {

      winstonLogger.info('authenticationController handling login');

      return teacherAdapter.authenticate(email, password);

  },

    logoutTeacher(Token) {

      winstonLogger.info('authenticationController handling logout');

      return teacherAdapter.logout(Token);

  },
  // SchoolAdmin
  authenticateSchoolAdmin(email, password, username) {

    winstonLogger.info('authenticationController handling login');

    return schoolAdminAdapter.authenticate(email, password, username);

},

  logoutSchoolAdmin(Token) {

    winstonLogger.info('authenticationController handling logout');

    return schoolAdminAdapter.logout(Token);

},

};

export default authenticationController;