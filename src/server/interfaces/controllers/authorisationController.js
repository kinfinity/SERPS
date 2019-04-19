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
  authoriseParent(email, password, username) {

    console.log('authorisationController handling login');

    return parentAdapter.authorise(email, password, username);

  },
  // schoolAdmin
  authoriseSchoolAdmin(email, password) {

    console.log('authorisationController handling login');

    return schoolAdminAdapter.authorise(email, password);

  },
  // student
  authoriseStudent(email, password) {

    console.log('authorisationController handling login');

    return studentAdapter.authorise(email, password);

  },
  // teacher
  authoriseTeacher(email, password) {

    console.log('authorisationController handling login');

    return teacherAdapter.authorise(email, password);

  }

};

export default authorisationController;