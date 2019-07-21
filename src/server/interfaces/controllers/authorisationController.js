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


import parentAdapter from '../db/parentAdapter'
import schoolAdminAdapter from '../db/schoolAdminAdapter'
import studentAdapter from '../db/studentAdapter'
import teacherAdapter from '../db/teacherAdapter'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'

const authorisationController = {

  // Parent
  authoriseParent(accessToken) {

    return parentAdapter.authorise(accessToken)

  },
  // schoolAdmin
  authoriseSchoolAdmin(accessToken) {

    return schoolAdminAdapter.authorise(accessToken)

  },
  // student
  authoriseStudent(accessToken) {

    return studentAdapter.authorise(accessToken)

  },
  // teacher
  authoriseTeacher(accessToken) {

    return teacherAdapter.authorise(accessToken)

  }

}

export default authorisationController