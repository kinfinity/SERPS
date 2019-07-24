import teacherService from '../services/teacher'
import routeUtils from '../utils/routerOptions'
import express from 'express'
import bodyParser from 'body-parser'
import csurf from 'csurf'
import cookieParser from 'cookie-Parser'
import winstonLogger from '../utils/winstonLogger'


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
          const payload = await teacherService.signout({Token: req.params.Token})
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
          const payload = await teacherService.getInfo(
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
          const payload = await teacherService.getContactInfo(
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
          const payload = await teacherService.updateContactInfo(
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
          const payload = await teacherService.getPaymentInfo(
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
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = teacherService.getPaymentInfo()
    next()
  })
  teacherRouter.route('/SERPS/Teacher/paymentInfo/transactionHistory')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = teacherService.viewteacherPaymentTransactionHistory()
    next()
  })

  // notification API routes
  teacherRouter.route('/SERPS/Teacher/notifications')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('TEACHER-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await teacherService.getNotifications(
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

  module.exports = teacherRouter