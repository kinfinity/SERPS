import studentService from '../services/student'
import routeUtils from '../utils/routerOptions'
import express from 'express'
import cloudinaryCon from '../plugins/cloudinaryCon'
import winstonLogger from '../utils/winstonLogger'
import shortid from 'shortid'
import csurf from 'csurf'
import publicEnums from '../../app/publicEnums'
import jsStringCompression from 'js-string-compression'


/**
     * 
     *  Build  student API call routes
     *  
     */

  // student router for all student calls 
  const studentRouter = express.Router([routeUtils.routerOptions])

  
  studentRouter.route('/SERPS/student/logOut').get(routeUtils.asyncMiddleware (async(req,res) => {
      // *
      winstonLogger.info('STUDENT-LOGOUT')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await studentService.signout({Token: req.body.Token})
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
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    // *
    winstonLogger.info('STUDENT-PROFILE')
    
    if(req.body !== null) {

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
          const payload = await studentService.getStudentPersonalInfo(studentName,studentID)

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(studentProfileInfo)

          payload.state = 'success'
          res.json(studentProfileInfo)

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
  studentRouter.route('/SERPS/student/contactInfo/update')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-CONTACTINFO')
    
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
          const payload = await studentService.getStudentPersonalInfo(
              req.body.studentName,
              req.body.studentID,
              req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: updating contactInfo')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

  }))
  studentRouter.route('/SERPS/student/academicInfo')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-ACADEMICINFO')
    
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
          const payload = await studentService.getStudentAcademictInfo(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
        )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting contactInfo')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

  }))
  studentRouter.route('/SERPS/student/guardianInfo')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-GAURDIANINFO')
    
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
          const payload = await studentService.getStudentGuardianInfo(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
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
  studentRouter.route('/SERPS/student/guardianInfo/update')
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-GAURDIANINFO')
    
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
          const payload = await studentService.updateStudentGuardianInfo(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: updating guardianInfo')
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
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-NOTIFICATIONS')
    
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
          const payload = await studentService.getNotifications(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting notifications')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

  }))

  // activity API call routes
  studentRouter.route('/SERPS/student/activities')
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
          const payload = await studentService.getActivities(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
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
          const payload = await studentService.getActivityNotification(
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
  .get(routeUtils.asyncMiddleware (async(req,res) => {
    
    winstonLogger.info('STUDENT-ACTIVITY NOTIFICATIONS')
    
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
          const payload = await studentService.getTimetable(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: getting activity notifications')
        winstonLogger.error(e)

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
    const parentKey = studentService.generateParentKey(studentID)
    
    winstonLogger.info('STUDENT-GENERATE PARENT KEY')
    
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
          const payload = await studentService.getTimetable(
            req.body.studentName,
            req.body.studentID,
            req.body.contactInfo
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: generating parent key')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
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
          const payload = await studentService.getLectureNotes(
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
          const payload = await studentService.viewresults(
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