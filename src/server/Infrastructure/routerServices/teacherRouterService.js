import routeUtils from '../utils/routerOptions'
import express from 'express'
import bodyParser from 'body-parser'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import winstonLogger from '../utils/winstonLogger'
import profileManagementController from '../../interfaces/controllers/profileManagementController';
import notificationController from '../../interfaces/controllers/notificationController';


/**
     * 
     *  Build  teacher API call routes
     *  
     */

  // teacher router for all teacher calls 
  const teacherRouter = express.Router([routeUtils.routerOptions])
  teacherRouter.use(bodyParser.json())// to allow parsing json

  
  //Middleware
  const csrfMiddleware = csurf({cookie: true})// crorss site resource forgery Handling

  //  
  teacherRouter.use('/SERPS/Teacher',routeUtils.asyncMiddleware(routeUtils.authTeacher))
  teacherRouter.use(cookieParser())
  teacherRouter.use(csrfMiddleware)

  teacherRouter.get('/csrfTOKENstudent', csrfMiddleware, function (req, res) {
      // send the token to client
      res.json({ csrfToken: req.csrfToken()})
  })
    
  teacherRouter.post('/csrfTOKENstudent', csrfMiddleware, function (req, res) {
      //process the Token for validation
  })
  
  //
  teacherRouter.route('/SERPS/Teacher/logOut').get(async (req,res,next) => {
      try{

          // *
          // const payload = await teacherService.signout({Token: req.params.Token})
          res.json(payload)

      }catch(e){
        res.status(500).json(e)
      }
      next()
  })

  // Info API routes
  teacherRouter.route('/SERPS/Teacher')// profileInfo
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('TEACHER-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
        
          // *
          const payload = await profileManagementController.getTeacherInfo(
            req.body.schoolname,
            req.body.schoolID,
            req.body.teacherName,
            req.body.teacherID
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR:getting student info')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))

  teacherRouter.route('/SERPS/Teacher/contactInfo')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('TEACHER-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await profileManagementController.getTeacherContactInfo(
            req.body.schoolname,
            req.body.schoolID,
            req.body.teacherName,
            req.body.teacherID
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR:getting student info')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))
  
  teacherRouter.route('/SERPS/Teacher/contactInfo/update')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('TEACHER-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await profileManagementController.updateTeacherContactInfo(
            req.body.schoolname,
            req.body.schoolID,
            req.body.teacherName,
            req.body.teacherID,
            req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR:getting student info')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))
  
  // * payment API routes
  teacherRouter.route('/SERPS/Teacher/paymentInfo')
.get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('TEACHER-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await paymentManagementController.getTeacherPaymentInfo(
            req.body.schoolname,
            req.body.schoolID,
            req.body.teacherName,
            req.body.teacherID
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR:getting teacher payment info')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))
  teacherRouter.route('/SERPS/Teacher/paymentInfo/update')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = await paymentManagementController.getTeacherPaymentInfo()
    next()
  }))
  teacherRouter.route('/SERPS/Teacher/paymentInfo/transactionHistory')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = paymentManagementController.viewteacherPaymentTransactionHistory()
    next()
  }))

  // notification API routes
  teacherRouter.route('/SERPS/Teacher/notifications')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('TEACHER-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
        
          // *
          const payload = await notificationController.getNotifications(
            req.body.schoolname,
            req.body.schoolID
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR:getting teacher payment info')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))










  //---------------------------------------------------- REFACTOR -----------------------------------------------------//
  const refactor = {
    async getInfo(schoolName,schoolID,teacherName,teacherID){
      return profileManagementController.getTeacherInfo(schoolName,schoolID,teacherName,teacherID)
    },
    async getContactInfo(schoolName,schoolID,teacherName,teacherID){
      return profileManagementController.getTeacherContactInfo(schoolName,schoolID,teacherName,teacherID)
    },
    async updateContactInfo(schoolName,schoolID,teacherName,teacherID,contactInfo){
      return profileManagementController.updateTeacherContactInfo(schoolName,schoolID,teacherName,teacherID,contactInfo)
    },
    async updateTeacher(teacherName,teacherID,teacherData){
        return profileManagementController.updateTeacher(teacherName,teacherID,teacherData)
    },
    async createStudentHealthReport(studentID,teacherID,healthData){
        return profileManagementController.createStudentHealthReport(studentID,teacherID,healthData)
    },
    async getStudentHealthReport(studentID,teacherID){
        return profileManagementController.getStudentHealthReport(studentID,teacherID)
    },
    async updateStudentHealthReport(studentID,teacherID){
        return profileManagementController.updateStudentHealthReport(studentID,teacherID)
    },
    async removeStudentHealthReport(studentID,teacherID){
        return profileManagementController.removeStudentHealthReport(studentID,teacherID)
    },
  
    // paymentManagementController
    async getPaymentInfo(SchoolName,SchoolID,teacherName,teacherID){
      return paymentManagementController.getTeacherPaymentInfo(SchoolName,SchoolID,teacherName,teacherID)
    },
    async updatePaymentInfo(SchoolName,schoolID,teacherName,teacherID,paymentInfo){
        return paymentManagementController.updateTeacherPaymentInfo(SchoolName,schoolID,teacherName,teacherID,paymentInfo)
    },
    async viewPaymentTransactionHistory(SchoolName,SchoolID,teacherName,teacherID){// TransactionID month teacher bank[Teacher] accNo Receipt/Amount
        return paymentManagementController.viewTeacherPaymentTransactionHistory(SchoolName,SchoolID,teacherName,teacherID) 
    },

    // notificationController
    getNotifications(){
      return notificationAdapter.getLatest() // max=10
    },

    async getSubjectTimetable(){},
    async getClassTimetable(){},

    
    async uploadStudentResults(){},
    async viewStudentresult(student){},
    async updateAttendance(Attendance){},//list of students and bool
    // documentsController
    async uploadLectureNote(type,subject,Class,lectureNoteData,teacherID){
      return documentsController.uploadLectureNote(type,subject,Class,lectureNoteData,teacherID)
    },
    async getLectureNote(type,subject,Class,noteTitle){
        return documentsController.getLectureNote(type,subject,Class,noteTitle)
    },
    async deletelectureNote(type,subject,Class,noteTitle,teacherID){
        return documentsController.deleteLectureNote(type,subject,Class,noteTitle,teacherID)
    },
    async uploadLectureCuriculum(type,subject,Class,lectureCuriculumData,teacherID){
      return documentsController.uploadLectureCuriculum(type,subject,Class,lectureCuriculumData,teacherID)
    },
    async getLectureCuriculum(type,subject,Class,lectureCuriculumTitle){
        return documentsController.getLectureCuriculum(type,subject,Class,lectureCuriculumTitle)
    },
    async deleteLectureCuriculum(type,subject,Class,lectureCuriculumTitle,teacherID){
        return documentsController.deleteLectureNote(type,subject,Class,lectureCuriculumTitle,teacherID)
    },
    async getAssignment(AssisgnmentTitle,subject,Class){
        return documentsController.getAssignment(AssisgnmentTitle,subject,Class)
    },
    async uploadAssignment(AssignmentData,subject,Class,teacherID){
        return documentsController.uploadAssignment(AssignmentData,subject,Class,teacherID)
    },
    async deleteAssignment(AssisgnmentTitle,subject,Class,teacherID){
        return documentsController.deleteAssignment(AssisgnmentTitle,subject,Class,teacherID)
    },
    //
    async getMessages(){},

    async updateHealthStatus(student){},
    async getHealthStatus(student){},
    async updateConduct(student){},
    async getConduct(student){}
  }

  module.exports = teacherRouter