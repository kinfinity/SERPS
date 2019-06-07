
/*
 * #k_infinityIII@Echwood
 *
 * singUpController: ()
 *
 *Functions:
 *
 */
import schoolAdminAdapter from '../db/schoolAdminAdapter'
import studentAdapter from '../db/studentAdapter'
import schoolEvent from '../Events/schoolEvents'
import winstonLogger from '../../Infrastructure/utils/winstonLogger';

const signUpController = {

  // Interface layer controller for creating User
  async createSchool(params) {
    
    let sData = null 
        await schoolAdminAdapter.persist(params).then((Data) => {

          winstonLogger.info('Controller Data')
          winstonLogger.info(Data)

            if(Data == null){
              //if school wasn't created properly
              winstonLogger.error("Data wasn't persisted")
              return Data
            }
              // fire Events then send payload
              winstonLogger.info('FIRING_EVENT: school-registered')
              winstonLogger.info(Data)
              
              schoolEvent.
              emit(
                  'school-registered',
                  {
                    email: Data.email,
                    schoolID: Data.schoolID
                  }
                )// send a few params

            sData = Data

        }).catch((e) => {

          winstonLogger.error('error getting Data from signUp')
          winstonLogger.error(e)
          // if there was error in generating payload
          return null

        }) 

        return sData

  },

  // Interface layer controller for creating Teacher
  async createTeacher(email, password) {

  },

  // Interface layer controller for creating pareants
  async createParents(email, password) {

  },

  // Interface layer controller for creating students
  async createStudent(params) {
    
    let sData = null 
    await studentAdapter.persist(params).then((Data) => {

      winstonLogger.info('Controller Data')
      winstonLogger.info(Data)

        if(Data == null){
          //if student wasn't created properly
          winstonLogger.error("Data wasn't persisted")
          return Data
        }
          // fire Events then send payload
          winstonLogger.info('FIRING_EVENT: student-registered')
          winstonLogger.info(Data)
          
          schoolEvent.
          emit(
              'student-registered',
              {
                email: Data.email,
                name: Data.fullName 
              } 
            )// send a few params

        sData = Data

    }).catch((e) => {

      winstonLogger.error('error getting Data from signUp')
      winstonLogger.error(e)
      // if there was error in generating payload
      return null

    }) 

    return sData
  }

}

export default signUpController