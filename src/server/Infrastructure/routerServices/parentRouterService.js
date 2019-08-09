import routeUtils from '../utils/routerOptions'
import express from 'express'
import bodyParser from 'body-parser'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import winstonLogger from '../utils/winstonLogger'
import profileManagementController from '../../interfaces/controllers/profileManagementController';
import paymentManagementController from '../../interfaces/controllers/paymentManagementController';


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
          //const payload = await parentService.signout({Token: req.params.Token})
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
          const payload = await profileManagementController.getParentInfo(
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
          const payload = await profileManagementController.getParentContactInfo(
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
          const payload = await profileManagementController.updateParentContactInfo(
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
          const payload = await paymentManagementController.getParentPaymentInfo(
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
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = await paymentManagementController.getParentPaymentInfo()
    next()
  }))
  parentRouter.route('/SERPS/Parent/paymentInfo/transactionHistory')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    
    // *
    const studentResults = await paymentManagementController.viewParentPaymentTransactionHistory()
    next()
  }))

  // notification API routes
  parentRouter.route('/SERPS/Parent/notifications')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    // *
    winstonLogger.info('PARENT-PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          // *
          const payload = await utils.getNotifications(
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
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    //const studentResults = parentService.viewStudentresults()
    next()
  }))
  parentRouter.route('/SERPS/Parent/Student/healthInfo')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = await profileManagementController.getStudentHealthInfo()
    next()
  }))
  parentRouter.route('/SERPS/Parent/Student/healthInfo/update')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = await profileManagementController.getStudentHealthReport()
    next()
  }))
  parentRouter.route('/SERPS/Parent/Student/healthStatus')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = await profileManagementController.getStudentHealthReports()
    next()
  }))
  parentRouter.route('/SERPS/Parent/Student/payTuition')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = await paymentManagementController.payTution()
    next()
  }))
  parentRouter.route('/SERPS/Parent/Student/attendance')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = await educationManagementController.getStudentAttendance()
    next()
  }))
  parentRouter.route('/SERPS/Parent/Student/activities')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = await educationManagementController.getStudentActivities()
    next()
  }))
  parentRouter.route('/SERPS/Parent/Student/activity/Notification')
  .get(routeUtils.asyncMiddleware (async(req,res,next) => {
    try{}catch(e){}
    // *
    const studentResults = await educationManagementController.getActivityNotification()
    next()
  }))



  //
  const utils = {
    getNotifications: async(parentName,parentID) => {

      let schools = null , notifications = []
  
      winstonLogger.info('GET CHILD(REN) SCHOOL(S):')
      winstonLogger.info(parentName)
      winstonLogger.info(parentID)
  
      await profileManagementController.getChildrenInfo(parentName,parentID).
      then((studentInfo) => {
  
        winstonLogger.info('CHILDRENs Info:')
        winstonLogger.info(JSON.stringify(studentInfo,null,4))
  
        schools = studentInfo
  
      }).
      catch((e) => {
  
        winstonLogger.error('ERROR: getting children Info')
        winstonLogger.error(e.stack)
  
        return Promise.resolve({
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          data: null
        })
  
      })
      winstonLogger.info('SCHOOLS:')
      winstonLogger.info(JSON.stringify(schools,null,4))
  
      let schoolName = null, schoolID = null
  
      for(let index in schools){
        if(Number.isInteger(parseInt(index))){
          //
          schoolName = schools[index].schoolName
          schoolID = schools[index].schoolID
          notifications.push(Promise.resolve(notificationController.getNotifications(schoolName,schoolID)))
  
        }
      }
  
       return notifications
  
    },

  }
  
  module.exports = parentRouter