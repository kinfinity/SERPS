import studentService from '../../services/student';
import routerOptions from '../../utils/routerOptions';

/**
     * 
     *  Build  student API call routes
     *  
     */

  // student router for all student calls 
  const studentRouter = express.Router([routerOptions]);

  // Authentication routes
  studentRouter.route('/SERPS/student/signUp').get((req,res) => {
    // 
    studentService.authenticate({
        
    });
    next();
  });
  studentRouter.route('/SERPS/student/login').get((req,res) => {
      // *
      studentService.authenticate({
          email: req.params.email,
          password: req.params.password,
          username: req.params.username,
          clientID: req.params.clientID
      });
      next();
  });
  studentRouter.route('/SERPS/:student/logOut').get((req,res) => {
      // *
      studentService.signout({Token: req.params.Token});
      next();
  });

  // Info API routes
  studentRouter.route('/SERPS/:student')// profileInfo
  .get((req,res) => {
    // *
    const studentProfileInfo = studentService.getStudentPersonalInfo(studentName,studentID);
    next();
  });
  studentRouter.route('/SERPS/:student/contactInfo/update')
  .get((req,res) => {
    // *
    const result = studentService.updateContactInfo(req.params.ContactInfo);
    next();
  });
  studentRouter.route('/SERPS/:student/addressInfo')
  .get((req,res) => {
    // *
    const studentProfile = studentService.getStudentAddressInfo(studentName,studentID);
    next();
  });
  studentRouter.route('/SERPS/:student/addressInfo/update')
  .get((req,res) => {
    // *
    const studentProfile = studentService.updateStudentAddressInfo(studentName,studentID,AddressInfo);
    next();
  });
  studentRouter.route('/SERPS/:student/academicInfo')
  .get((req,res) => {
    // *
    const studentProfile = studentService.getStudentAcademictInfo(studentName,studentID);
    next();
  });
  studentRouter.route('/SERPS/:student/guardianInfo')
  .get((req,res) => {
    // *
    const studentProfile = studentService.getStudentGuardianInfo(studentName,studentID);
    next();
  });
  studentRouter.route('/SERPS/:student/guardianInfo/update')
  .get((req,res) => {
    // *
    const studentProfile = studentService.updateStudentGuardianInfo(studentName,studentID,guardianInfo);
    next();
  });


  // notification API routes
  studentRouter.route('/SERPS/:student/notifications')
  .get((req,res) => {
    // *
    const notifications = studentService.getNotifications();
    next();
  });

  // activity API call routes
  studentRouter.route('/SERPS/:student/activities')
  .get((req,res) => {
    // *][\]
    const studentResults = studentService.getActivities(StudentID);
    next();
  });
  studentRouter.route('/SERPS/:student/activities/Notifications')
  .get((req,res) => {
    // *
    const studentResults = studentService.getActivityNotification();
    next();
  });

  // timetable API call routes
  studentRouter.route('/SERPS/:student/timeTable')
  .get((req,res) => {
    // *
    const timeTable = studentService.getTimetable(studentID);
    next();
  });

  // parentkey API call routes
  studentRouter.route('/SERPS/:student/parentKey')
  .get((req,res) => {
    // *
    const parentKey = studentService.generateParentKey(studentID);
    next();
  });

  // lectureNotes API call routes
  studentRouter.route('/SERPS/:student/:subject/lectureNotes')
  .get((req,res) => {
    // *
    const studentResults = studentService.getLectureNotes(subjectAlias);
    next();
  });

  //results API call routes
  studentRouter.route('/SERPS/:student/results')
  .get((req,res) => {
    // *
    const studentResults = studentService.viewresults(studentID);
    next();
  });

  module.exports = studentRouter;