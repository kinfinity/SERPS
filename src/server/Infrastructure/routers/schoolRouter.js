import schoolService from '../services/school'
import routeUtils from '../utils/routerOptions'
import express from 'express'
import authorisationService from '../../domains/services/authorisationService'
import cloudinaryCon from '../plugins/cloudinaryCon'
import winstonLogger from '../utils/winstonLogger'
import csurf from 'csurf'


    /*      
     *  Build  school API call routes
     *  
     */
    // school router for all school calls
    const schoolRouter = express.Router([routeUtils.routerOptions])
    
    //Middleware
    const csrfMiddleware = csurf({cookie: true})

    //
    schoolRouter.use('/SERPS/:School',routeUtils.authSchool())
    schoolRouter.use(csrfMiddleware)

// Non openAccess_Routes : require Access Token
  schoolRouter.route('/SERPS/:School/logOut').get(routeUtils.asyncMiddleware (async (req,res, next) => {
      try {
          //first authorize for this API
          const authResult = await authorisationService.authoriseToken(Token)
          if(!authResult){
              res.sendStatus(403).json()
          }
          winstonLogger.info(authResult)
          // authorisation should send back basic info to use for 

          // *
          const payload = await schoolService.signout({Token: req.body.Token})
          res.json(payload)

      } catch (e) {
          res.sendStatus(500).json(e)
      }
      next()
}))

  // Info API routes
  schoolRouter.route('/SERPS/:School')// profileInfo
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // * REVIEW to make sure schools can access only their school data when authorised
        const schoolProfileInfo = await schoolService.getProfileInfo(
          req.body.schoolName,
          req.body.schoolID
        )
        res.json(schoolProfileInfo)

    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/contactInfo')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const schoolContactInfo = await schoolService.getContactInfo(
            req.body.schoolName,
            req.body.schoolID
        )
        res.json(schoolContactInfo)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/contactInfo/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.updateContactInfo(
          req.body.ContactInfo
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/addressInfo')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const schoolAddressInfo = await schoolService.getAddressInfo()
        res.json(schoolAddressInfo)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/addressInfo/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await schoolService.updateAddressInfo(req.body.addressInfo)
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  // payment API routes
  schoolRouter.route('/SERPS/:School/paymentInfo')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const studentResults = await schoolService.getschoolPaymentInfo(
          req.body.SchoolName,
          req.body.SchoolID
        )
        res.json(studentResults)
        
    } catch (e) {
      
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/paymentInfo/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = schoolService.updateSchoolPaymentInfo(
            req.body.schoolName,
            req.body.schoolID,
            req.body.paymentInfoData
        )
        res.json(result)
          
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/paymentInfo/transactionHistory')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        // *
        const transactionHistory = await schoolService.viewSchoolPaymentTransactionHistory(
          req.body.schoolName,
          req.body.schoolID
        )
        res.json(transactionHistory)
    
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))

  // notification API routes
  schoolRouter.route('/SERPS/:School/notifications')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const notifications = await schoolService.getNotifications()
        res.json(notifications)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/notifications/create')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.createNotification({
          noteTitle: req.body.noteTitle,
          Note: req.body.Note,
          imageLink: req.body.imageLink
        })
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/notifications/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await schoolService.updateNotification()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/notifications/delete')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await schoolService.deleteNotification({
          noteTitle: req.body.noteTitle,
          noteID: req.body.noteID
        })
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))

  // timetable API routes
  schoolRouter.route('/SERPS/:School/:class/createTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = schoolService.createTimetable(
          req.body.timeTableData
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/getTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const timeTable = await schoolService.getClassTimetable(
          req.body.classAlias
        )
        res.json(timeTable)
        
    } catch (error) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/updateTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await schoolService.updateTimetable(
          req.body.ClassAlias,
          req.body.subject,
          req.body.timeSlot
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/deleteTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await schoolService.deleteTimetable(
          req.body.classAlias,
          req.body.timeTableID
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/archiveTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await schoolService.archiveTimetable(
            req.body.classAlias,
            req.body.timeTableID
        )
        res.json(result)

    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  // class API call routes
  schoolRouter.route('/SERPS/:School/createClass')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        // *
        const result = await schoolService.createClass(
            req.body.classAlias,
            req.body.classData
        )
        res.json(result)

    } catch (e) {
      res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/createClassSequence')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.createclassSequence()
        res.json(result)

    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try{
        
        // *
        const classData = schoolService.getClass(
          req.body.classAlias
        )
        res.json(classData)
        
    }catch(e){
        // res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/createSubject')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = schoolService.createSubject(
            req.body.classAlias,
            req.body.subjectData
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/:subject')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const SubjectData = await schoolService.getSubject(
            req.body.classAlias,
            req.body.subjectTitle
        )
        res.json(SubjectData)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.updateClass(classAlias)
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/:subject')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {

        // *
        const result = await schoolService.updateSubject(
            req.body.classAlias,
            req.body.subjectTitle
        )
        res.json(result)

    } catch (e) {
      res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/remove')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.removeClass(
          req.body.classAlias
        )
        res.json(result)

    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/:subject/remove')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.removeSubject(
            req.body.classAlias,
            req.body.subjectTitle
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/assignTeacher')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        //*
        const result = await schoolService.assignClassTeacher(
            req.body.classAlias,
            req.body.TeacherID
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/reassignTeacher')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.reassignClassTeacher()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/activity/create')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.createActivity(
            req.body.activityAlias,
            req.body.activityData
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))

  // activity API call routes
  schoolRouter.route('/SERPS/:School/:activity')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.getActivity(
            req.body.activityAlias
        )
        res.json(result)
        
    } catch (e) {
        // res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:activity/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.updateActivity(
            req.body.activityAlias,
            req.body.activityData
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:activity/remove')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.remove(
            req.body.activityAlias
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:activity/assignTeacher')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.assignActivityTeacher(
            req.body.activityAlias,
            req.body.TeacherID
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:activity/reassignTeacher')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.reassignActivityTeacher(
            req.body.activityAlias,
            req.body.oldTeacher,
            req.body.newTeacher
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))

  // results API call routes
  schoolRouter.route('/SERPS/:School/results/pending')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.viewPendingResults()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/results/validate')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.validatePendingResult(
            req.body.SubjectID,
            req.body.classAlias
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))

  // student API call routes
  schoolRouter.route('/SERPS/:School/registeredStudents')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.viewRegisteredStudents()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/registeredStudents/:student')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.viewRegisteredStudent(
            req.body.studentID
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/registeredStudents/:student/validate')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    // *
    const result = schoolService.validatere(studentID)
    next()
}))

  // lectureNote API call routes
  schoolRouter.route('/SERPS/:School/:class/:subject/')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const lectureNotes = await schoolService.getLectureNotes(
            req.body.subject,
            req.body.classAlias
        )
        res.json(lectureNotes)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/:subject/:lectureNoteID')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const lectureNote = await schoolService.getLectureNote(
            req.body.subject,
            req.body.classAlias,
            req.body.lectureNoteID
        )
        res.json(lectureNote)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/:class/:subject/:lectureNote/validate')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.validateLectureNote(
            req.body.subject,
            req.body.classAlias,
            req.body.lectureNoteID
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))

  //
  schoolRouter.route('/SERPS/:School/createClassSequence')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.createclass()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:School/createGradeRanges')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.createGradeRanges(gradeData)
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))

  module.exports = schoolRouter