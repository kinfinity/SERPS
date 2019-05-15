/*
 * #k_infinityIII@Echwood
 *
 * authorisationController: ()
 *
 *Functions:
 *
 * authorise Users
 * create / verify session
 *
 *
 */


import parentAdapter from '../db/parentAdapter';
import schoolAdminAdapter from '../db/schoolAdminAdapter';
import studentAdapter from '../db/studentAdapter';
import teacherAdapter from '../db/teacherAdapter';

const authorisationController = {

  // Parent
  authoriseParent(accessToken) {

    console.log('authorisationController handling login');

    return parentAdapter.authorise(accessToken);

  },
  // schoolAdmin
  authoriseSchoolAdmin(accessToken) {

    console.log('authorisationController handling login');

    return schoolAdminAdapter.authorise(accessToken);

  },
  // student
  authoriseStudent(accessToken) {

    console.log('authorisationController handling login');

    return studentAdapter.authorise(accessToken);

  },
  // teacher
  authoriseTeacher(accessToken) {

    console.log('authorisationController handling login');

    return teacherAdapter.authorise(accessToken);

  }

};

export default authorisationController;