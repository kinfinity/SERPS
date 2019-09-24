
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
import teacherEvent from '../Events/teacherEvents'
import winstonLogger from '../../Infrastructure/utils/winstonLogger'
import parentAdapter from '../db/parentAdapter'
import parentEvent from '../Events/parentEvents'
import teacherAdapter from '../db/teacherAdapter'


const signUpController = {

  // Interface layer controller for creating User
  async createSchool(params) {
    
    let sData = null 
        await schoolAdminAdapter.persist(params).then((Data) => {

          winstonLogger.info('Controller Data')
          winstonLogger.info(Data)

            if(!Data){
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
          winstonLogger.error(e.stack)
          // if there was error in generating payload
          return res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            statusMessage: publicEnums.SERPS_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
            Token: null
          })

        }) 

        return sData

  },

  // Interface layer controller for creating Teacher
  async createTeacher(params) {

    let sData = null 
        await teacherAdapter.persist(params).then((Data) => {

          winstonLogger.info('Controller Data')
          winstonLogger.info(JSON.stringify(Data,null,4))

            if(!Data){
              //if school wasn't created properly
              winstonLogger.error("Data wasn't persisted")
              return Data
            }
              // fire Events then send payload
              winstonLogger.info('FIRING_EVENT: teacher-registered')
              winstonLogger.info(Data)
              
              teacherEvent.
              emit(
                  'teacher-registered',
                  {
                    email: Data.email,
                    teacherID: Data.parentID
                  }
              )// send a few params

            sData = Data

        }).catch((e) => {

          winstonLogger.error('error getting Data from signUp')
          winstonLogger.error(e.stack)
          // if there was error in generating payload
          return null

        }) 

        return sData

  },

  // Interface layer controller for creating pareants
  async createParent(params) {
    
    let sData = null 
        await parentAdapter.persist(params).then((Data) => {

          winstonLogger.info('Controller Data')
          winstonLogger.info(JSON.stringify(Data,null,4))

            if(!Data){
              //if school wasn't created properly
              winstonLogger.error("Data wasn't persisted")
              return Data
            }
              // fire Events then send payload
              winstonLogger.info('FIRING_EVENT: school-registered')
              winstonLogger.info(Data)
              
              parentEvent.
              emit(
                  'parent-registered',
                  {
                    email: Data.email,
                    parentID: Data.parentID
                  }
              )// send a few params

            sData = Data

        }).catch((e) => {

          winstonLogger.error('error getting Data from signUp')
          winstonLogger.error(e.stack)
          // if there was error in generating payload
          return null

        }) 

        return sData
  },

  // Interface layer controller for creating students
  async createStudent(params) {
    
    let sData = null 
    await studentAdapter.persist(params).then((xData) => {

      winstonLogger.info('Controller Data')
      winstonLogger.info(JSON.stringify(xData,null,4))

        if(!xData){
          //if student wasn't created properly
          winstonLogger.error("Data wasn't persisted")
          return xData
        }
          // fire Events then send payload
          winstonLogger.info('FIRING_EVENT: student-registered')
          winstonLogger.info(JSON.stringify(xData,null,4))
          
          schoolEvent.
          emit(
              'student-registered',
              {
                email: xData.Data.email,
                name: xData.Data.fullName 
              } 
          )// send a few params
          sData = xData

    }).catch((e) => {

      winstonLogger.error('error getting Data from signUp')
      winstonLogger.error(e.stack)
      // if there was error in generating payload
      return null

    }) 

    return sData
  }

}

export default signUpController