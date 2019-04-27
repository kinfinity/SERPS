
/*
 * #k_infinityIII@Echwood
 *
 * singUpController: ()
 *
 *Functions:
 *    createUuser
 *    createRestuarant
 *    createWaiter
 *
 */
import schoolAdminAdapter from '../db/schoolAdminAdapter';

const signUpController = {

  // Interface layer controller for creating User
  async createSchool(params) {

        await schoolAdminAdapter.persist(params).then((payload) => {

            console.log('there is no error');
            return payload;

        }).catch((e) => {

          console.log('error caught');
          return null;

        }); 
        
  },

  // Interface layer controller for creating Teacher
  createTeacher(email, password) {

  },

  // Interface layer controller for creating student
  createStudent(email, password) {

  },

  // Interface layer controller for creating Parents
  createStudent(email, password) {
      
  }

};

export default signUpController;