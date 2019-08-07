import parentService from '../services/parent'
import routeUtils from '../utils/routerOptions'
import express from 'express'
import bodyParser from 'body-parser'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import winstonLogger from '../utils/winstonLogger'


/**
     * 
     *  Build  parent API call routes
     *  
     */

  // Parent router for all parent calls 
  const parentRouter = express.Router([routeUtils.routerOptions])
  parentRouter.use(bodyParser.json())// to allow parsing json

  
  //Middleware
  const csrfMiddleware = csurf({cookie: true})// crorss site resource forgery Handling

  //  
  parentRouter.use('/SERPS/Parent',routeUtils.asyncMiddleware(routeUtils.authParent))
  parentRouter.use(cookieParser())
  parentRouter.use(csrfMiddleware)

  parentRouter.get('/csrfTOKENstudent', csrfMiddleware, function (req, res) {
      // send the token to client
      res.json({ csrfToken: req.csrfToken()})
  })
    
  parentRouter.post('/csrfTOKENstudent', csrfMiddleware, function (req, res) {
      //process the Token for validation
  })
  

  //
  parentRouter.route('/SERPS/Parent/logOut').get(async (req,res) => {
      try{

          // *
          const payload = await parentService.signout({Token: req.params.Token})
          res.json(payload)

      }catch(e){
        res.status(500).json(e)
      }
      next()
  })

  // Info API routes
  parentRouter.route('/SERPS/Parent')// profileInfo
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('PARENT-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await parentService.getProfileInfo(
            req.body.parentName,
            req.body.parentID
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

  parentRouter.route('/SERPS/Parent/contactInfo')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('PARENT-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await parentService.getContactInfo(
            req.body.parentName,
            req.body.parentID
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
  
  parentRouter.route('/SERPS/Parent/contactInfo/update')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('PARENT-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await parentService.updateContactInfo(
            req.body.parentName,
            req.body.parentID,
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
  parentRouter.route('/SERPS/Parent/paymentInfo')
.get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('PARENT-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await parentService.getPaymentInfo(
            req.body.parentName,
            req.body.parentID
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR:getting parent payment info')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))
  parentRouter.route('/SERPS/Parent/paymentInfo/update')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getPaymentInfo()
    next()
  })
  parentRouter.route('/SERPS/Parent/paymentInfo/transactionHistory')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.viewParentPaymentTransactionHistory()
    next()
  })

  // notification API routes
  parentRouter.route('/SERPS/Parent/notifications')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('PARENT-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await parentService.getNotifications(
            req.body.parentName,
            req.body.parentID
          )

          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR:getting parent payment info')
        winstonLogger.error(e.stack)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

      }

    next()

  }))

  // child(ren)[student(s)] API routes
  parentRouter.route('/SERPS/Parent/Student/Results')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.viewStudentresults()
    next()
  })
  parentRouter.route('/SERPS/Parent/Student/healthInfo')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getHealthInfo()
    next()
  })
  parentRouter.route('/SERPS/Parent/Student/healthInfo/update')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.updateHealthInfo()
    next()
  })
  parentRouter.route('/SERPS/Parent/Student/healthStatus')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getHealthStatus()
    next()
  })
  parentRouter.route('/SERPS/Parent/Student/payTuition')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.payTution()
    next()
  })
  parentRouter.route('/SERPS/Parent/Student/attendance')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getAttendance()
    next()
  })
  parentRouter.route('/SERPS/Parent/Student/activities')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getActivities()
    next()
  })
  parentRouter.route('/SERPS/Parent/Student/activity/Notification')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getActivityNotification()
    next()
  })

  module.exports = parentRouter