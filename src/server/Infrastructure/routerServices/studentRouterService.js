import routeUtils from '../utils/routerOptions'
import express from 'express'
// import cloudinaryCon from '../../plugins/cloudinaryCon'
import winstonLogger from '../utils/winstonLogger'
// import shortid from 'shortid'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import publicEnums from '../../app/publicEnums'
import jsStringCompression from 'js-string-compression'
import profileManagementController from '../../interfaces/controllers/profileManagementController';
import notificationController from '../../interfaces/controllers/notificationController';
import educationManagementController from '../../interfaces/controllers/educationManagementController';
import timeTableController from '../../interfaces/controllers/timeTableController';
import accountManagementController from '../../interfaces/controllers/accountManagementController';
import documentsController from '../../interfaces/controllers/documentsController';


/**
     * 
     *  Build  student API call routes
     *  
     */

  // student router for all student calls 
  const studentRouter = express.Router([routeUtils.routerOptions])

  //Middleware
  const csrfMiddleware = csurf({cookie: true})// crorss site resource forgery Handling

  //  
  studentRouter.use('/SERPS/Student',routeUtils.asyncMiddleware(routeUtils.authStudent))
  studentRouter.use(cookieParser())
  studentRouter.use(csrfMiddleware)

  studentRouter.get('/csrfTOKENstudent', csrfMiddleware, function (req, res) {
      // send the token to client
      res.json({ csrfToken: req.csrfToken()})
  })
    
  studentRouter.post('/csrfTOKENstudent', csrfMiddleware, function (req, res) {
      //process the Token for validation
  })
  
  studentRouter.route('/SERPS/student/logOut').get(routeUtils.asyncMiddleware (async(req,res) => {
      // *
      winstonLogger.info('STUDENT-LOGOUT')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          // const payload = await studentService.signout({Token: req.body.Token})
          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: signing out')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

      next()
  }))

  // Info API routes
  studentRouter.route('/SERPS/student')// profileInfo
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('STUDENT-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await profileManagementController.getStudentPersonalInfo(
            req.body.schoolName,
            req.body.fullName,
            req.body.studentID
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
  studentRouter.route('/SERPS/student/contactInfo/update')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    
    winstonLogger.info('STUDENT-CONTACTINFO')
    
    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await profileManagementController.updateStudentContactInfo(
            req.body.schoolName,
            req.body.fullName,
            req.body.studentID,
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

        winstonLogger.error('ERROR: updating contactInfo')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))
  studentRouter.route('/SERPS/student/academicInfo')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    
    winstonLogger.info('STUDENT-ACADEMICINFO')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await profileManagementController.getStudentAcademicInfo(
            req.body.schoolName,
            req.body.fullName,
            req.body.studentID
        )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting contactInfo')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))
  // *
  studentRouter.route('/SERPS/student/guardianInfo')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-GAURDIANINFO')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
        
          // *
          const payload = await profileManagementController.getGuardianInfo(
            req.body.schoolName,
            req.body.fullName,
            req.body.studentID
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting guardianInfo')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

  }))

  // notification API routes
  studentRouter.route('/SERPS/student/notifications')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    
    winstonLogger.info('STUDENT-NOTIFICATIONS')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
        
          // *
          const payload = await notificationController.getNotifications(
            req.body.schoolName,
            req.body.schoolID,
            req.body.fullName,
            req.body.studentID
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting notifications')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

  }))

  // *** activity API call routes
  studentRouter.route('/SERPS/student/activities')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-ACTIVITIES')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await educationManagementController.getStudentActivities(
            req.body.schoolName,
            req.body.schoolID,
            req.body.studentName,
            req.body.studentID
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)   

      } catch (e) {

        winstonLogger.error('ERROR: getting activities')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

  }))
  studentRouter.route('/SERPS/student/activities/Notifications')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-ACTIVITIES')
    
    if(req.body === null) {

        winstonLogger.error('ERROR: WRONG REQUEST PARAMS')

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
            Data: null
        })

    }

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await educationManagementController.getActivityNotification(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting activities notifications')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

  }))

  // timetable API call routes
  studentRouter.route('/SERPS/student/timeTable')   
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    
    winstonLogger.info('STUDENT-ACTIVITY NOTIFICATIONS')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
        
          // *
          const payload = await timeTableController.getClassTimetable(
            req.body.schoolName,
            req.body.classAlias
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting activity notifications')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()
    
  }))

  // parentkey API call routes
  studentRouter.route('/SERPS/student/parentKey')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    // *
    
    winstonLogger.info('STUDENT-GENERATE PARENT KEY')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
        
          // *
          const payload = await accountManagementController.generateParentKey(
            req.body.schoolName,
            req.body.schoolID,
            req.body.studentName,
            req.body.studentID
          )
    
          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: generating parent key')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))

  // lectureNotes API call routes
  studentRouter.route('/SERPS/student/subject/lectureNotes')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-GET LECTURE NOTES')
    
    if(req.body === null) {

        winstonLogger.error('ERROR: WRONG REQUEST PARAMS')

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
            Data: null
        })

    }

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
        
          // *
          const payload = await documentsController.getLectureNotes(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting LectureNotes')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

  }))

  //results API call routes
  studentRouter.route('/SERPS/student/results')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-GET LECTURE NOTES')
    
    if(req.body === null) {

        winstonLogger.error('ERROR: WRONG REQUEST PARAMS')

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
            Data: null
        })

    }

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
        
          // *
          const payload = await educationManagementController.getStudentResults(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting student Results')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

  }))

  module.exports = studentRouter