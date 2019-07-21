import parentService from '../services/parent'
import routeUtils from '../utils/routerOptions'
import express from 'express'
import bodyParser from 'body-parser'
import csurf from 'csurf'
import cookieParser from 'cookie-Parser'

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
  parentRouter.use('/SERPS/Student',routeUtils.asyncMiddleware(routeUtils.authStudent))
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
  .get((req,res) => {
    try{}catch(e){}
    // *
    const parentProfileInfo = parentService.getProfileInfo(parentName,ParentID)
    next()
  })
  parentRouter.route('/SERPS/Parent/createProfile')// profileInfo
  .get((req,res) => {
    try{}catch(e){}
    // *
    const result = parentService.createProfileInfo()// conditional
   next()
  })
  parentRouter.route('/SERPS/Parent/contactInfo')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const parentContactInfo = parentService.getContactInfo()
    next()
  })
  parentRouter.route('/SERPS/Parent/contactInfo/update')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const result = parentService.updateContactInfo(req.params.ContactInfo)
    next()
  })
  parentRouter.route('/SERPS/Parent/addressInfo')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const parentProfile = parentService.getAdressInfo()
    next()
  })
  parentRouter.route('/SERPS/Parent/addressInfo/update')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const parentProfile = parentService.updateAddressInfo()
    next()
  })
  // payment API routes
  parentRouter.route('/SERPS/Parent/paymentInfo')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getParentPaymentInfo()
    next()
  })
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
  .get((req,res) => {
    try{}catch(e){}
    // *
    const notifications = parentService.getNotifications()
    next()
  })

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