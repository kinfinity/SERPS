import schoolService from '../services/school';
import routerOptions from '../utils/routerOptions';
import express from 'express';
import bodyParser from 'body-parser';

/**
     * 
     *  Build  school API call routes
     *  
     */

  // school router for all school calls 
  const schoolRouter = express.Router([routerOptions]);
  schoolRouter.use(bodyParser.json());

  // Authentication routes
  schoolRouter.route('/SERPS/School/signUp').get(async (req,res) => {
    try{

        // 
        const payload = await schoolService.signupSchool({
            Name: req.body.Name,
            motto: req.body.motto,
            Address: req.body.Address,
            Logo: req.body.logoLink,
            Images: [req.body.imagesLinks] // 1-3
        });
        res.json(payload);

    }catch(e){
        res.status(500).json(e);
    }
    next();
  });
  schoolRouter.route('/SERPS/School/login').get(async (req,res) => {
      try {
          
          // *
          const payload = await schoolService.authenticate({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
          });
          res.json(payload);
          
      } catch (e) {
          res.status(500).json(e);
      }
      next();
  });
  schoolRouter.route('/SERPS/:School/logOut').get(async (req,res) => {
      try {
          
          // *
          const payload = await schoolService.signout({Token: req.body.Token});
          res.json(payload);

      } catch (e) {
          res.status(500).json(e);
      }
      next();
  });

  // Info API routes
  schoolRouter.route('/SERPS/:School')// profileInfo
  .get(async (req,res) => {
    try {
        
        // *
        const schoolProfileInfo = await schoolService.getProfileInfo(
          req.body.schoolName,
          req.body.schoolID
        );
        res.json(schoolProfileInfo);

    } catch (e) {
        res.status(500).json(e);
    }
    next();
  });
  schoolRouter.route('/SERPS/:school/contactInfo')
  .get(async (req,res) => {
    try {
        
        // *
        const schoolContactInfo = await schoolService.getContactInfo();
        res.json(schoolContactInfo);
        
    } catch (e) {
        res.status(500).json(e);
    }
    next();
  });
  schoolRouter.route('/SERPS/:school/contactInfo/update')
  .get(async (req,res) => {
    try {
      
        // *
        const result = await schoolService.updateContactInfo(
          req.body.ContactInfo
        );
        res.json(result);
        
    } catch (e) {
        res.status(500).json(e);
    }
    next();
  });
  schoolRouter.route('/SERPS/:school/addressInfo')
  .get(async (req,res) => {
    try {
        
        // *
        const schoolAddressInfo = await schoolService.getAddressInfo();
        res.json(schoolAddressInfo);
        
    } catch (e) {
        res.status(500).json(e);
    }
    next();
  });
  schoolRouter.route('/SERPS/:school/addressInfo/update')
  .get(async (req,res) => {
    try {
        
        // *
        const result = await schoolService.updateAddressInfo(req.body.addressInfo);
        res.json(result);
        
    } catch (e) {
        res.status(500).json(e);
    }
    next();
  });
  // payment API routes
  schoolRouter.route('/SERPS/:school/paymentInfo')
  .get(async (req,res) => {
    try {
        
        // *
        const studentResults = await schoolService.getschoolPaymentInfo(
          req.body.SchoolName,
          req.body.SchoolID
        );
        res.json(studentResults);
        
    } catch (e) {
      
    }
    next();
  });
  schoolRouter.route('/SERPS/:school/paymentInfo/update')
  .get(async (req,res) => {
    try {
        
        // *
        const result = schoolService.updateSchoolPaymentInfo(
            req.body.schoolName,
            req.body.schoolID,
            req.body.paymentInfoData
        );
        res.json(result);
          
    } catch (e) {
        res.status(500).json(e);
    }
    next();
  });
  schoolRouter.route('/SERPS/:school/paymentInfo/transactionHistory')
  .get(async (req,res) => {
    try {
        // *
        const transactionHistory = await schoolService.viewSchoolPaymentTransactionHistory(
          req.body.schoolName,
          req.body.schoolID
        );
        res.json(transactionHistory);
    
    } catch (e) {
        res.status(500).json(e);
    }
    next();
  });

  // notification API routes
  schoolRouter.route('/SERPS/:school/notifications')
  .get((req,res) => {
    // *
    const notifications = schoolService.getNotifications();
    next();
  });
  schoolRouter.route('/SERPS/:school/notifications/create')
  .get((req,res) => {
    // *
    const notifications = schoolService.createNotification();
    next();
  });
  schoolRouter.route('/SERPS/:school/notifications/update')
  .get((req,res) => {
    // *
    const notifications = schoolService.updateNotification();
    next();
  });
  schoolRouter.route('/SERPS/:school/notifications/delete')
  .get((req,res) => {
    // *
    const notifications = schoolService.deleteNotification();
    next();
  });

  // timetable API routes
  schoolRouter.route('/SERPS/:school/:class/createTimetable')
  .get((req,res) => {
    // *
    const result = schoolService.createTimetable();
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/getTimetable')
  .get((req,res) => {
    // *
    const result = schoolService.getClassTimetable();
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/updateTimetable')
  .get((req,res) => {
    // *
    const result = schoolService.updateTimetable();
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/deleteTimetable')
  .get((req,res) => {
    // *
    const result = schoolService.deleteTimetable();
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/archiveTimetable')
  .get((req,res) => {
    // *
    const result = schoolService.archiveTimetable();
    next();
  });
  // class API call routes
  schoolRouter.route('/SERPS/:school/createClass')
  .get((req,res) => {
    // *
    const result = schoolService.createClass(classAlias,classData);
    next();
  });
  schoolRouter.route('/SERPS/:school/createClassSequence')
  .get((req,res) => {
    // *
    const result = schoolService.createclassSequence();
    next();
  });
  schoolRouter.route('/SERPS/:school/:class')
  .get((req,res) => {
    // *
    const classData = schoolService.getClass(classAlias);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/createSubject')
  .get((req,res) => {
    // *
    const result = schoolService.createSubject(classAlias,subjectData);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/:subject')
  .get((req,res) => {
    // *
    const SubjectData = schoolService.getSubject(classAlias,subjectTitle);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/update')
  .get((req,res) => {
    // *
    const result = schoolService.updateClass(classAlias);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/:subject')
  .get((req,res) => {
    // *
    const result = schoolService.updateSubject(classAlias,subjectTitle);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/remove')
  .get((req,res) => {
    // *
    const result = schoolService.removeClass(classAlias);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/:subject/remove')
  .get((req,res) => {
    // *
    const result = schoolService.removeSubject(classAlias,subjectTitle);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/assignTeacher')
  .get((req,res) => {
    // *
    const result = schoolService.assignClassTeacher(classAlias,TeacherID);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/reassignTeacher')
  .get((req,res) => {
    // *
    const result = schoolService.reassignClassTeacher();
    next();
  });
  schoolRouter.route('/SERPS/:school/activity/create')
  .get((req,res) => {
    // *
    const result = schoolService.createActivity(activityAlias,activityData);
    next();
  });

  // activity API call routes
  schoolRouter.route('/SERPS/:school/:activity')
  .get((req,res) => {
    // *
    const result = schoolService.getActivity(activityAlias);
    next();
  });
  schoolRouter.route('/SERPS/:school/:activity/update')
  .get((req,res) => {
    // *
    const result = schoolService.updateActivity(activityAlias,activityData);
    next();
  });
  schoolRouter.route('/SERPS/:school/:activity/remove')
  .get((req,res) => {
    // *
    const result = schoolService.remove(activityAlias);
    next();
  });
  schoolRouter.route('/SERPS/:school/:activity/assignTeacher')
  .get((req,res) => {
    // *
    const result = schoolService.assignActivityTeacher(activityAlias,TeacherID);
    next();
  });
  schoolRouter.route('/SERPS/:school/:activity/reassignTeacher')
  .get((req,res) => {
    // *
    const result = schoolService.reassignActivityTeacher(activityAlias,oldTeacher,newTeacher);
    next();
  });

  // results API call routes
  schoolRouter.route('/SERPS/:school/results/pending')
  .get((req,res) => {
    // *
    const result = schoolService.viewPendingResults();
    next();
  });
  schoolRouter.route('/SERPS/:school/results/validate')
  .get((req,res) => {
    // *
    const result = schoolService.validatePendingResult(SubjectID,classAlias);
    next();
  });

  // student API call routes
  schoolRouter.route('/SERPS/:school/registeredStudents')
  .get((req,res) => {
    // *
    const result = schoolService.viewRegisteredStudents();
    next();
  });
  schoolRouter.route('/SERPS/:school/registeredStudents/:student')
  .get((req,res) => {
    // *
    const result = schoolService.viewRegisteredStudent(studentID);
    next();
  });
  schoolRouter.route('/SERPS/:school/registeredStudents/:student/validate')
  .get((req,res) => {
    // *
    const result = schoolService.validatere(studentID);
    next();
  });

  // lectureNote API call routes
  schoolRouter.route('/SERPS/:school/:class/:subject/')
  .get((req,res) => {
    // *
    const lectureNotes = schoolService.getLectureNotes(subject,classAlias);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/:subject/:lectureNoteID')
  .get((req,res) => {
    // *
    const lectureNotes = schoolService.getLectureNote(subject,classAlias,lectureNoteID);
    next();
  });
  schoolRouter.route('/SERPS/:school/:class/:subject/:lectureNote/validate')
  .get((req,res) => {
    // *
    const lectureNotes = schoolService.validateLectureNote(subject,classAlias,lectureNoteID);
    next();
  });

  //
  schoolRouter.route('/SERPS/:school/createClassSequence')
  .get((req,res) => {
    // *
    const lectureNotes = schoolService.createclass();
    next();
  });
  schoolRouter.route('/SERPS/:school/createGradeRanges')
  .get((req,res) => {
    // *
    const lectureNotes = schoolService.createGradeRanges(gradeData);
    next();
  });

  module.exports = schoolROuter;