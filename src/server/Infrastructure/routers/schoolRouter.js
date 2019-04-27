import schoolService from '../services/school'
import {routerOptions,verifyToken,asyncMiddleware} from '../utils/routerOptions'
import express from 'express'
import bodyParser from 'body-parser'
import authorisationService from '../../domains/services/authorisationService'
import multerHandle from '../utils/multerHandle'
import cloudinaryCon from '../plugins/cloudinaryCon'

/**
     * 
     *  Build  school API call routes
     *  
     */

  // school router for all school calls 
  console.log(routerOptions)
  const schoolRouter = express.Router([routerOptions])
  schoolRouter.use(bodyParser.json())

  // Authentication routes
  schoolRouter.route('/SERPS/School/signUp').get(asyncMiddleware(async (req,res,next) => {

    //multerHandle.single('Logo')
    // cloudinaryCon.upload(req.file.path);
    
    try{
      console.log(req.body)
      const payload = await schoolService.signupSchool({
        Name: req.body.Name,
        email: req.body.email,
        password: req.body.password,
        motto: req.body.motto,
        Address: req.body.Address,
        Logo: req.file.path,
        Images: [req.body.imagesLinks] // 1-3
      })
      res.sendStatus(200).json(payload)

    }catch(e) {
      // res.sendStatus(404).json(e)
      console.log('there is an error')
    }

    next()

}))
  schoolRouter.route('/SERPS/School/login').get(asyncMiddleware(async (req,res,next) => {
      try {
          
          // *
          const payload = await schoolService.authenticate({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
          })
          res.json(payload)
          
      } catch (e) {
          // res.sendStatus(500).json(e)
      }
      next()
}))
  schoolRouter.route('/SERPS/:School/logOut').get(asyncMiddleware (async (req,res, next) => {
      try {
          //first authorize for this API
          const authResult = await authorisationService.authoriseToken(Token)
          if(!authResult){
              res.sendStatus(403).json()
          }
          console.log(authResult)

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
  .get(asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
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
  schoolRouter.route('/SERPS/:school/contactInfo')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const schoolContactInfo = await schoolService.getContactInfo()
        res.json(schoolContactInfo)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/contactInfo/update')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/addressInfo')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const schoolAddressInfo = await schoolService.getAddressInfo()
        res.json(schoolAddressInfo)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/addressInfo/update')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/paymentInfo')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/paymentInfo/update')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/paymentInfo/transactionHistory')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/notifications')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const notifications = await schoolService.getNotifications()
        res.json(notifications)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/notifications/create')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/notifications/update')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await schoolService.updateNotification()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/notifications/delete')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/createTimetable')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/getTimetable')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/updateTimetable')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/deleteTimetable')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/archiveTimetable')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/createClass')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/createClassSequence')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.createclassSequence()
        res.json(result)

    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/:class')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/createSubject')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/:subject')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/update')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.updateClass(classAlias)
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/:class/:subject')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/remove')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/:subject/remove')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/assignTeacher')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/reassignTeacher')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.reassignClassTeacher()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/activity/create')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:activity')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:activity/update')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:activity/remove')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:activity/assignTeacher')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:activity/reassignTeacher')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/results/pending')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await schoolService.viewPendingResults()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/results/validate')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/registeredStudents')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.viewRegisteredStudents()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/registeredStudents/:student')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/registeredStudents/:student/validate')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
      
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    // *
    const result = schoolService.validatere(studentID)
    next()
}))

  // lectureNote API call routes
  schoolRouter.route('/SERPS/:school/:class/:subject/')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/:subject/:lectureNoteID')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/:class/:subject/:lectureNote/validate')
  .get(asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/SERPS/:school/createClassSequence')
  .get(asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await schoolService.createclass()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/:school/createGradeRanges')
  .get(asyncMiddleware (async (req,res, next) => {
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