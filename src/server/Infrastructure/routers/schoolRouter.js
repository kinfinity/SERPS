import schoolService from '../services/school'
import routeUtils from '../utils/routerOptions'
import express from 'express'
import bodyParser from 'body-parser'
import authorisationService from '../../domains/services/authorisationService'
import cloudinaryCon from '../plugins/cloudinaryCon'
import winstonLogger from '../utils/winstonLogger'
/**
     * 
     *  Build  school API call routes
     *  
     */

  // school router for all school calls
  const schoolRouter = express.Router([routeUtils.routerOptions])
  schoolRouter.use(bodyParser.json())

//   schoolRouter.use('/School',routeUtils.authSchool())
  // Authentication routes
  schoolRouter.route('/School/signUp').get(routeUtils.asyncMiddleware(async (req,res,next) => {
    
    winstonLogger.profile('schoool_signup')
    const profiler = winstonLogger.startTimer()
    try{

        winstonLogger.info(req.body)
        
        const payloadS = await schoolService.signupSchool({
            Name: req.body.Name,
            schoolPrefix: req.body.schoolPrefix,
            email: req.body.email,
            password: req.body.password,
            motto: req.body.motto,
            Address: req.body.Address,
            Images: req.body.imagesLinks // 1-3
        })

        // if it worked save the image to cloudinary with schoolName / profile
        // cloudinaryCon.uploadSchoolLogo(req.body.Logo)
        
        // Send the payload to client
        res.json(payloadS)

    }catch(e) {
      
      winstonLogger.error(e)

      const payloadE = {
          statusCode: 'SC102',
          Token: null
      }
      res.json(payloadE)
    }
    
    profiler.done({ message: 'End of school_signup' })
    
    
    next()

}))
  schoolRouter.route('/School/login').get(routeUtils.asyncMiddleware(async (req,res,next) => {
      try {
          
          // *
          winstonLogger.info("LOGIN")
          winstonLogger.info(req.body)

          const payload = await schoolService.authenticate({
            email: req.body.email || null,
            password: req.body.password,
            username: req.body.username || null
          })
          winstonLogger.info("payload is here")
          winstonLogger.info(payload)
          res.json(payload)
          
      } catch (e) {
          // res.sendStatus(500).json(e)
      }
      next()
}))
  schoolRouter.route('/:School/logOut').get(routeUtils.asyncMiddleware (async (req,res, next) => {
      try {
          //first authorize for this API
          const authResult = await authorisationService.authoriseToken(Token)
          if(!authResult){
              res.sendStatus(403).json()
          }
          winstonLogger.info(authResult)

          // *
          const payload = await schoolService.signout({Token: req.body.Token})
          res.json(payload)

      } catch (e) {
          res.sendStatus(500).json(e)
      }
      next()
}))

  // Info API routes
  schoolRouter.route('/:School')// profileInfo
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
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
  schoolRouter.route('/:school/contactInfo')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const schoolContactInfo = await schoolService.getContactInfo()
        res.json(schoolContactInfo)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/:school/contactInfo/update')
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
  schoolRouter.route('/:school/addressInfo')
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
  schoolRouter.route('/:school/addressInfo/update')
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
  schoolRouter.route('/:school/paymentInfo')
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
  schoolRouter.route('/:school/paymentInfo/update')
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
  schoolRouter.route('/:school/paymentInfo/transactionHistory')
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
  schoolRouter.route('/:school/notifications')
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
  schoolRouter.route('/:school/notifications/create')
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
  schoolRouter.route('/:school/notifications/update')
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
  schoolRouter.route('/:school/notifications/delete')
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
  schoolRouter.route('/:school/:class/createTimetable')
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
  schoolRouter.route('/:school/:class/getTimetable')
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
  schoolRouter.route('/:school/:class/updateTimetable')
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
  schoolRouter.route('/:school/:class/deleteTimetable')
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
  schoolRouter.route('/:school/:class/archiveTimetable')
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
  schoolRouter.route('/:school/createClass')
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
  schoolRouter.route('/:school/createClassSequence')
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
  schoolRouter.route('/:school/:class')
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
  schoolRouter.route('/:school/:class/createSubject')
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
  schoolRouter.route('/:school/:class/:subject')
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
  schoolRouter.route('/:school/:class/update')
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
  schoolRouter.route('/:school/:class/:subject')
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
  schoolRouter.route('/:school/:class/remove')
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
  schoolRouter.route('/:school/:class/:subject/remove')
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
  schoolRouter.route('/:school/:class/assignTeacher')
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
  schoolRouter.route('/:school/:class/reassignTeacher')
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
  schoolRouter.route('/:school/activity/create')
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
  schoolRouter.route('/:school/:activity')
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
  schoolRouter.route('/:school/:activity/update')
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
  schoolRouter.route('/:school/:activity/remove')
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
  schoolRouter.route('/:school/:activity/assignTeacher')
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
  schoolRouter.route('/:school/:activity/reassignTeacher')
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
  schoolRouter.route('/:school/results/pending')
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
  schoolRouter.route('/:school/results/validate')
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
  schoolRouter.route('/:school/registeredStudents')
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
  schoolRouter.route('/:school/registeredStudents/:student')
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
  schoolRouter.route('/:school/registeredStudents/:student/validate')
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
  schoolRouter.route('/:school/:class/:subject/')
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
  schoolRouter.route('/:school/:class/:subject/:lectureNoteID')
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
  schoolRouter.route('/:school/:class/:subject/:lectureNote/validate')
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
  schoolRouter.route('/:school/createClassSequence')
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
  schoolRouter.route('/:school/createGradeRanges')
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