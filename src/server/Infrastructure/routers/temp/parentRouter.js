import parentService from '../../services/parent';
import routerOptions from '../../utils/routerOptions';
import express from 'express';
import bodyParser from 'body-parser';

/**
     * 
     *  Build  parent API call routes
     *  
     */

  // Parent router for all parent calls 
  const parentRouter = express.Router([routerOptions]);
  parentRouter.use(bodyParser.json());// to allow parsing json

  // Authentication routes
  parentRouter.route('/SERPS/Parent/signUp').get(async (req,res) => {
    try{

        // params.parentRegID,params.OTP
        const payload = await parentService.authenticate({
          parentRegID: req.body.parentRegID,
          OTP: req.body.pOTP,
        });
        res.json(payload);//

    }catch(e){
        res.status(500).json(e);
    }
    next();
  });
  parentRouter.route('/SERPS/Parent/login').get(async (req,res) => {
      try{

          // *
          const payload = await parentService.authenticate({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
          });
          res.json(payload);

      }catch(e){
        res.status(400).json(e);
      }
      next();
  });
  parentRouter.route('/SERPS/:Parent/logOut').get(async (req,res) => {
      try{

          // *
          const payload = await parentService.signout({Token: req.params.Token});
          res.json(payload);

      }catch(e){
        res.status(500).json(e);
      }
      next();
  });

  // Info API routes
  parentRouter.route('/SERPS/:Parent')// profileInfo
  .get((req,res) => {
    try{}catch(e){}
    // *
    const parentProfileInfo = parentService.getProfileInfo(parentName,ParentID);
    next();
  });
  parentRouter.route('/SERPS/:Parent/createProfile')// profileInfo
  .get((req,res) => {
    try{}catch(e){}
    // *
    const result = parentService.createProfileInfo();// conditional
   next();
  });
  parentRouter.route('/SERPS/:Parent/contactInfo')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const parentContactInfo = parentService.getContactInfo();
    next();
  });
  parentRouter.route('/SERPS/:Parent/contactInfo/update')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const result = parentService.updateContactInfo(req.params.ContactInfo);
    next();
  });
  parentRouter.route('/SERPS/:Parent/addressInfo')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const parentProfile = parentService.getAdressInfo();
    next();
  });
  parentRouter.route('/SERPS/:Parent/addressInfo/update')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const parentProfile = parentService.updateAddressInfo();
    next();
  });
  // payment API routes
  parentRouter.route('/SERPS/:Parent/paymentInfo')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getParentPaymentInfo();
    next();
  });
  parentRouter.route('/SERPS/:Parent/paymentInfo/update')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getPaymentInfo();
    next();
  });
  parentRouter.route('/SERPS/:Parent/paymentInfo/transactionHistory')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.viewParentPaymentTransactionHistory();
    next();
  });

  // notification API routes
  parentRouter.route('/SERPS/:Parent/notifications')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const notifications = parentService.getNotifications();
    next();
  });

  // child(ren)[student(s)] API routes
  parentRouter.route('/SERPS/:Parent/:Student/Results')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.viewStudentresults();
    next();
  });
  parentRouter.route('/SERPS/:Parent/:Student/healthInfo')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getHealthInfo();
    next();
  });
  parentRouter.route('/SERPS/:Parent/:Student/healthInfo/update')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.updateHealthInfo();
    next();
  });
  parentRouter.route('/SERPS/:Parent/:Student/healthStatus')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getHealthStatus();
    next();
  });
  parentRouter.route('/SERPS/:Parent/:Student/payTuition')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.payTution();
    next();
  });
  parentRouter.route('/SERPS/:Parent/:Student/attendance')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getAttendance();
    next();
  });
  parentRouter.route('/SERPS/:Parent/:Student/activities')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getActivities();
    next();
  });
  parentRouter.route('/SERPS/:Parent/:Student/activity/Notification')
  .get((req,res) => {
    try{}catch(e){}
    // *
    const studentResults = parentService.getActivityNotification();
    next();
  });

  module.exports = parentRouter;