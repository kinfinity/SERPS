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
    authenticateStudent(detail, password) {

      winstonLogger.info('authenticationController handling login');
      winstonLogger.info(detail)
      winstonLogger.info(password)

      return studentAdapter.authenticate(detail, password);

  },

    logoutStudent(Token) {

      winstonLogger.info('authenticationController handling logout');

    return studentAdapter.logout(Token);

  },

  // Parent
    authenticateParent(detail, password) {

      winstonLogger.info('authenticationController handling login');

      return parentAdapter.authenticate(detail, password);

  },

    logoutParent(Token) {

      winstonLogger.info('authenticationController handling logout');

      return parentAdapter.logout(Token);

  },

  // Teacher
    authenticateTeacher(detail, password) {

      winstonLogger.info('authenticationController handling login');

      return teacherAdapter.authenticate(detail, password);

  },

    logoutTeacher(Token) {

      winstonLogger.info('authenticationController handling logout');

      return teacherAdapter.logout(Token);

  },
  // SchoolAdmin
  authenticateSchoolAdmin(detail, password) {

    winstonLogger.info('authenticationController handling login');

    return schoolAdminAdapter.authenticate(detail, password);

},

  logoutSchoolAdmin(Token) {

    winstonLogger.info('authenticationController handling logout');

    return schoolAdminAdapter.logout(Token);

},

};

export default authenticationController;