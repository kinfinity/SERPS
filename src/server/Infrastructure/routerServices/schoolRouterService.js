import routeUtils from '../utils/routerOptions'
import express from 'express'
import authorisationService from '../../domains/services/authorisationService'
import cloudinaryCon from '../plugins/cloudinaryCon'
import winstonLogger from '../utils/winstonLogger'
import redisCache from '../utils/redisClient'
// import shortid from 'shortid'
import csurf from 'csurf'
import publicEnums from '../../app/publicEnums'
import jsStringCompression from 'js-string-compression'
import cookieParser from 'cookie-parser'
import profileManagementController from '../../interfaces/controllers/profileManagementController'
import paymentManagementController from '../../interfaces/controllers/paymentManagementController'
import schoolSessionController from '../../interfaces/controllers/schoolSessionController'
import notificationController from '../../interfaces/controllers/notificationController'
import timeTableController from '../../interfaces/controllers/timeTableController'
import educationManagementController from '../../interfaces/controllers/educationManagementController'
import documentsController from '../../interfaces/controllers/documentsController'

/**
 * base64 image strings are compress b4 sent to server
 * so we decompress them first 
 * 
 */
const hm = new jsStringCompression.Hauffman()

    /*      
     *  Build  school API call routes
     *  
     */
    // school router for all school calls
    const schoolRouter = express.Router([routeUtils.routerOptions])
    
    //Middleware
    const csrfMiddleware = csurf({cookie: true})// crorss site resource forgery Handling

    //
    schoolRouter.use('/SERPS/School',routeUtils.asyncMiddleware(routeUtils.authSchool))
    schoolRouter.use(cookieParser())
    schoolRouter.use(csrfMiddleware)

    schoolRouter.get('/csrfTOKENS', csrfMiddleware, function (req, res) {
        // send the token to client
        res.json({ csrfToken: req.csrfToken()})
    })
      
    schoolRouter.post('/csrfTOKENS', csrfMiddleware, function (req, res) {
        //process the Token for validation
    })

// Non openAccess_Routes : require Access Token
  schoolRouter.route('/SERPS/School/logOut').get(routeUtils.asyncMiddleware(async (req,res, next) => {

    winstonLogger.info('SCHOOL-LOGOUT')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
    
      try {
          //first authorize for this API
          const authResult = await authorisationService.authoriseToken(Token)
          if(!authResult){
              res.sendStatus(403).json()
          }
          winstonLogger.info(authResult)
          // authorisation should send back basic info to use for 

          // * REVIEW
         // const payload = await schoolService.signout({Token: req.body.Token})
          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: signing out')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

      }

    next()

}))

  // Info API routes
  schoolRouter.route('/SERPS/School')// profileInfo
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('GET: SCHOOL PROFILE')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))


    try {
        
        // * REVIEW to make sure schools can access only their school data when authorised
        const schoolProfileInfo = await profileManagementController.getSchoolInfo(
          req.body.schoolName,
          req.body.schoolID
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(schoolProfileInfo,null,4))

        res.json({
            state: 'success',
            statusCode: schoolProfileInfo.statusCode,
            Data: schoolProfileInfo.Data
        })

    } catch (e) {

        winstonLogger.error('ERROR: getting profileInfo')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    // next()

}))

  schoolRouter.route('/SERPS/School/contactInfo')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('GET: SCHOOL CONTACT_INFO')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        
        // *
        winstonLogger.info('SCHOOL')
        const schoolContactInfo = await profileManagementController.getSchoolContactInfo(
            req.body.schoolName,
            req.body.schoolID
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(schoolContactInfo,null,4))

        res.json({
            state: 'success',
            statusCode: schoolContactInfo.statusCode,
            Data: schoolContactInfo.Data
        })
        
    } catch (e) {

        winstonLogger.error('ERROR: getting contactInfo')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    // next()

}))
  schoolRouter.route('/SERPS/School/contactInfo/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
      
        // *
        const result = await profileManagementController.updateSchoolContactInfo(
            req.body.schoolName,
            req.body.schoolID,
            req.body.contactInfo
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(result,null,4))

        res.json({
            state: 'success',
            statusCode: result.statusCode,
            Data: result.Data
        })
        
    } catch (e) {

        winstonLogger.error('ERROR: updating contactInfo')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: false
        })

    }

    // next()

}))

  // payment API routes
  schoolRouter.route('/SERPS/School/paymentInfo')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('GET: SCHOOL PAYMENT_INFO')
    
    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))


    try {
        
        // *
        const paymentInfo = await paymentManagementController.getSchoolPaymentInfo(
            req.body.schoolName,
            req.body.schoolID
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(paymentInfo,null,4))

        res.json({
            state: 'success',
            statusCode: paymentInfo.statusCode,
            Data: paymentInfo.Data
        })
        
    } catch (e) {
      
        winstonLogger.error('ERROR: getting paymentInfo')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    // next()

}))
  schoolRouter.route('/SERPS/School/paymentInfo/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('UPDATE: SCHOOL PAYMENT_INFO')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        
        // *
        const result = await paymentManagementController.updateSchoolPaymentInfo(
            req.body.schoolName,
            req.body.schoolID,
            req.body.paymentInfo
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(result,null,4))

        res.json({
            state: 'success',
            statusCode: result.statusCode,
            Data: result.Data
        })
          
    } catch (e) {
        
        winstonLogger.error('ERROR: updating paymentInfo')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    // next()

}))
  schoolRouter.route('/SERPS/School/paymentInfo/transactionHistory') // REVIEW SEND BY DATE
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('GET: SCHOOL TRANSACTION_HISTORY')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const transactionHistory = await paymentManagementController.viewSchoolPaymentTransactionHistory(
          req.body.schoolName,
          req.body.schoolID
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(transactionHistory)

        
        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
            Data: transactionHistory
        })
    
    } catch (e) {
        
        winstonLogger.error('ERROR: getting transactionHistory')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))


    // schoolSession API routes
    schoolRouter.route('/SERPS/School/Session') // REVIEW SEND BY DATE
    .get(routeUtils.asyncMiddleware (async (req,res, next) => {
  
      winstonLogger.info('GET: SCHOOL SESSION')
  
      winstonLogger.info('REQUEST BODY')
      winstonLogger.info(JSON.stringify(req.body,null,4))
  
      try {
          
          // *
          const result = await schoolSessionController.getSchoolSession(
            req.body.schoolName,
            req.body.schoolID
          )
          winstonLogger.info('PAYLOAD')
          winstonLogger.info(JSON.stringify(result,null,4))
  
          
          res.json({
              state: 'success',
              statusCode: result.statusCode,
              Data: result.Data
          })
      
      } catch (e) {
          
          winstonLogger.error('ERROR: updating Session')
          winstonLogger.error(e)
  
          res.json({
              state: 'failure',
              statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
              Data: null
          })
  
      }
  
      // next()
  
  }))

  schoolRouter.route('/SERPS/School/Session/create') // REVIEW SEND BY DATE
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('CREATE: SCHOOL SESSION')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await schoolSessionController.createSchoolSession(
          req.body.schoolName,
          req.body.schoolID,
          req.body.notifications,
            {
                firstTerm: req.body.firstTerm,
                name: req.body.name,
                academicYear: req.body.academicYear
            }
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(result,null,4))

        
        res.json({
            state: 'success',
            statusCode: result.statusCode,
            Data: result.Data
        })
    
    } catch (e) {
        
        winstonLogger.error('ERROR: creating Session')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    // next()

}))

schoolRouter.route('/SERPS/School/Session/update') // REVIEW
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('UPDATE: SCHOOL SESSION')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await schoolSessionController.updateSchoolSession(
          req.body.schoolName,
          req.body.schoolID,{
              name:req.body.name,
              academicYear:req.body.academicYear,
              term: req.body.term   
          }
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(result,null,4))

        
        res.json({
            state: 'success',
            statusCode: result.statusCode,
            Data: result.Data
        })
    
    } catch (e) {
        
        winstonLogger.error('ERROR: updating Session')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    // next()

}))

  // notification API routes
  schoolRouter.route('/SERPS/School/notifications')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
      
    winstonLogger.info('GET: SCHOOL NOTIFICATIONS')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        
        // *
        const notifications = await notificationController.getNotifications(
            schoolName = req.body.schoolName,
            schoolID = req.body.schoolID
        )
        
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(notifications)

        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
            Data: notifications
        })
        
    } catch (e) {
         
        winstonLogger.error('ERROR: getting notification')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    // next()

}))
  schoolRouter.route('/SERPS/School/notifications/create')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('CREATE: SCHOOL NOTIFICATION')
    let payload = null
    
    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
      
        // *
        const result = await notificationController.createNotification(//noteTitle,noteID,noteImage,noteText
            req.body.schoolName,
            req.body.schoolID,
            req.body.noteTitle,
            req.body.noteID,
            'tempImage',
            req.body.noteText
        )

        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(result,null,4))
        res.json({
            state: 'success',
            statusCode: result.statusCode,
            Data: result.Data
        })
        
    } catch (e) {
        
        winstonLogger.error('ERROR: creating notification')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
            Data: null
        })

    }
    // Persist Logo and images if notification was created 
    if(payload.Data === null){
        //
    }else{

        winstonLogger.info('SAVE NOTIFICATION IMAGE TO CLOUDINARY')
        /**
         * if it worked save the image to cloudinary with noteTitle in school/notifications folder
         * payload.Data = notificationID
         * hm.decompress(req.body.noteImage)
         */
        const result = await cloudinaryCon.uploadNotificationImages(req.body.noteTitle,payload.Data,req.body.noteImage, req.body.schoolName,req.body.schoolID ).
        catch((e) => {

            winstonLogger.error('Error uploading notificationImage')
            winstonLogger.error(e)

        })

        winstonLogger.info('COUDLINARY RESULTS')
        winstonLogger.info(result)
        winstonLogger.info('END')
        payload.state = 'success'  
        
    }

    // next()

}))
  schoolRouter.route('/SERPS/School/notifications/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    
    if(req.body === null) {

        winstonLogger.error('ERROR: WRONG REQUEST PARAMS')

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
            Data: null
        })

    }

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        
        // *
        const result = await notificationController.updateNotification(//SchoolName,SchoolID,noteID,Data
            schoolName = req.body.schoolName,
            schoolID = req.body.schoolID,
            noteTitle = req.body.noteTitle,
            noteID = req.body.noteID,
            Data = req.body.Data
        )
        
        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
            Data: result
        })
        
    } catch (e) {

        winstonLogger.error('ERROR: creating notification')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
            Data: null
        })

    }

    next()

}))
  schoolRouter.route('/SERPS/School/notifications/remove')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        
        // *
        const result = await notificationController.deleteNotification(
            req.body.schoolName,
            req.body.schoolID,
            req.body.noteTitle,
            req.body.noteID
        )
        
        res.json({
            state: 'success',
            statusCode: result.statusCode,
            Data: result.Data
        })
        
    } catch (e) {

        winstonLogger.error('ERROR: removing notification')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
            Data: null
        })

    }

    next()

}))

//
schoolRouter.route('/SERPS/School/createSchoolSession')
.get(routeUtils.asyncMiddleware (async (req,res, next) => {
    
  winstonLogger.info('CREATE: SCHOOL SESSION')
  
  if(req.body === null) {

      winstonLogger.error('ERROR: WRONG REQUEST PARAMS')

      res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
          Data: null
      })

  }

  winstonLogger.info('REQUEST BODY')
  winstonLogger.info(JSON.stringify(req.body,null,4))

  try {
    
      // *
      const results = await schoolSessionController.createSchoolSession(
          schoolName = req.body.schoolName,
          schoolID = req.body.schoolID,
          sessionData = req.body.sessionData
      )
      
      winstonLogger.info('PAYLOAD')
      winstonLogger.info(results)

      res.json({
          state: 'success',
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: results
      })
      
  } catch (e) {
       
      winstonLogger.error('ERROR: getting notification')
      winstonLogger.error(e)

      res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Data: null
      })

  }

  next()

}))

schoolRouter.route('/SERPS/School/activateNextTerm')
.get(routeUtils.asyncMiddleware (async (req,res, next) => {
    
  winstonLogger.info('ACTIVATE: NEXT SCHOOL TERM')
  
  if(req.body === null) {

      winstonLogger.error('ERROR: WRONG REQUEST PARAMS')

      res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
          Data: null
      })

  }

  winstonLogger.info('REQUEST BODY')
  winstonLogger.info(JSON.stringify(req.body,null,4))

  try {
    
      // *
      const results = await schoolSessionController.activateNextTerm(
          schoolName = req.body.schoolName,
          schoolID = req.body.schoolID,
          TermData = req.body.TermData // REVIEW
      )
      
      winstonLogger.info('PAYLOAD')
      winstonLogger.info(results)

      res.json({
          state: 'success',
          statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
          Data: results
      })
      
  } catch (e) {
       
      winstonLogger.error('ERROR: getting notification')
      winstonLogger.error(e)

      res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Data: null
      })

  }

  next()

}))
  // timetable API routes
  schoolRouter.route('/SERPS/School/class/createTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        
        const result = await timeTableController.createTimetable(
            req.body.schoolName,
            req.body.schoolID,
            req.body.classAlias,
            req.body.timeTableData //ARRAY -> REVIEW
        )
        
        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
            Data: result
        })

    } catch (e) {

        winstonLogger.error('ERROR: creating timetable')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
            Data: null
        })

    }
    next()
}))
  schoolRouter.route('/SERPS/School/class/getTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const timeTable = await timeTableController.getClassTimetable(
            req.body.schoolName,
            req.body.schoolID,
            req.body.classAlias
        )
        res.json(timeTable)
        
    } catch (error) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/School/class/updateTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await timeTableController.updateTimetable(
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
  schoolRouter.route('/SERPS/School/class/deleteTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await timeTableController.deleteTimetable(
          req.body.classAlias,
          req.body.timeTableID
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/School/class/archiveTimetable')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const result = await timeTableController.archiveTimetable(
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
  schoolRouter.route('/SERPS/School/class/create')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('CREATE: CLASS')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        
        // *
        const result = await educationManagementController.createClass(
          req.body.schoolName,
          req.body.schoolID,
          req.body.classAlias,
          req.body.classData
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(result,null,4))
        
        res.json({
            state: 'success',
            statusCode: result.statusCode,
            Data: result.Data
        })
    
    } catch (e) {
        
        winstonLogger.error('ERROR: updating Session')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))

  schoolRouter.route('/SERPS/School/class')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    
    winstonLogger.info('CREATE: CLASS')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const classData = await educationManagementController.getClass(
          req.body.schoolName,
          req.body.schoolID,
          req.body.classAlias
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(classData,null,4))
        
        res.json({
            state: 'success',
            statusCode: classData.statusCode,
            Data: classData.Data
        })
    
    } catch (e) {
        
        winstonLogger.error('ERROR: getting class')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))

// Add general school subjectHolders -> e.g Biology
// then each class can create it's
// persosnal biology
schoolRouter.route('/SERPS/School/subjectHolder')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    
    winstonLogger.info('CREATE: CLASS')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const classData = await educationManagementController( // FIX-REVIEW
          req.body.schoolName,
          req.body.schoolID,
          req.body.classAlias
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(classData,null,4))
        
        res.json({
            state: 'success',
            statusCode: classData.statusCode,
            Data: classData.Data
        })
    
    } catch (e) {
        
        winstonLogger.error('ERROR: getting class')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))
schoolRouter.route('/SERPS/School/subjectHolder/create')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    
    winstonLogger.info('CREATE: SUBJECTHOLDER')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.createSubjectHolder(
          req.body.schoolName,
          req.body.schoolID,
          req.body.subjectName,
          req.body.subjectDescription
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(result,null,4))
        
        res.json({
            state: 'success',
            statusCode: result.statusCode,
            Data: result.Data
        })
    
    } catch (e) {
        
        winstonLogger.error('ERROR: creatig subjectHolder')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    // next()

}))
schoolRouter.route('/SERPS/School/subjectHolder/remove')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    
    winstonLogger.info('REMOVE: SUBJECTHOLDER')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.removeSubjectHolder(
          req.body.schoolName,
          req.body.schoolID,
          req.body.subjectName
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(JSON.stringify(result,null,4))
        
        res.json({
            state: 'success',
            statusCode: result.statusCode,
            Data: result.Data
        })
    
    } catch (e) {
        
        winstonLogger.error('ERROR: getting class')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))
//
schoolRouter.route('/SERPS/School/class/createSubject')
.get(routeUtils.asyncMiddleware (async (req,res, next) => {
    winstonLogger.info('CREATE: SUBJECT')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.createSubject(
            req.body.schoolName,
            req.body.schoolID,
            req.body.classAlias,
            req.body.subjectName,
            req.body.subjectData
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {
        
        winstonLogger.error('ERROR: getting class')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))
  schoolRouter.route('/SERPS/School/class/removeSubject')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    winstonLogger.info('CREATE: SUBJECT')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.removeSubject(
            req.body.schoolName,
            req.body.schoolID,
            req.body.classAlias,
            req.body.subjectName
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {
        
        winstonLogger.error('ERROR: removing subject')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()
    
}))
  schoolRouter.route('/SERPS/School/class/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    winstonLogger.info('UPDATE: CLASS')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.updateClass(
            req.body.schoolName,
            req.body.schoolID,
            req.body.classAlias,
            req.body.classData
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {
        
        winstonLogger.error('ERROR: updating class')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()
    
}))
  schoolRouter.route('/SERPS/School/class/Subject')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    winstonLogger.info('GET: SUBJECT')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.getSubject(
            req.body.schoolName,
            req.body.schoolID,
            req.body.classAlias,    
            req.body.subjectName
        )
        // if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        // }
    
    } catch (e) {
        
        winstonLogger.error('ERROR: getting subject')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()
    
}))
  schoolRouter.route('/SERPS/School/class/remove')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    winstonLogger.info('REMOVE: CLASS')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.removeClass(
            req.body.schoolName,
            req.body.schoolID,
            req.body.classAlias
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {
        
        winstonLogger.error('ERROR: removing class')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))
  schoolRouter.route('/SERPS/School/class/assignTeacher')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('ASSIGN: CLASS TEACHER')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.assignClassTeacher(
            req.body.schoolName,
            req.body.schoolID,
            req.body.classAlias,
            req.body.TeacherID
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {
        
        winstonLogger.error('ERROR: assigning class Teacher')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()
    
}))
  schoolRouter.route('/SERPS/School/activity/create')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
      
    winstonLogger.info('CREATE: ACTIVITY')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.createActivity(
            req.body.schoolName,
            req.body.schoolID,
            req.body.activityAlias,
            req.body.activityData
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {
        
        winstonLogger.error('ERROR: creating activity')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))

  // activity API call routes
  schoolRouter.route('/SERPS/School/activity')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    
    winstonLogger.info('GET: ACTIVITY')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.getActivity(
            req.body.schoolName,
            req.body.schoolID,
            req.body.activityAlias
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {
        
        winstonLogger.error('ERROR: creating activity')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))
  schoolRouter.route('/SERPS/School/activity/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
     
    winstonLogger.info('UPDATE: ACTIVITY')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.updateActivity(
            req.body.schoolName,
            req.body.schoolID,
            req.body.activityAlias,
            req.body.activityData
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {

        winstonLogger.error('ERROR: updating activity')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()

}))
  schoolRouter.route('/SERPS/School/activity/remove')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
         
    winstonLogger.info('REMOVE: ACTIVITY')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.removeActivity(
            req.body.schoolName,
            req.body.schoolID,
            req.body.activityAlias
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {

        winstonLogger.error('ERROR: removing activity')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()  
      
}))
  schoolRouter.route('/SERPS/School/activity/assignTeacher')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
             
    winstonLogger.info('UPDATE: ACTIVITY TEACHER')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))

    try {
        // *
        const result = await educationManagementController.assignActivityTeacher(
            req.body.schoolName,
            req.body.schoolID,
            req.body.activityAlias,
            req.body.teaccherID 
        )
        if(result){
            winstonLogger.info('PAYLOAD')
            winstonLogger.info(JSON.stringify(result,null,4))
            
            res.json({
                state: 'success',
                statusCode: result.statusCode,
                Data: result.Data
            })
        }
    
    } catch (e) {

        winstonLogger.error('ERROR: assign activity teacher')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Data: null
        })

    }

    next()  
    
}))
  schoolRouter.route('/SERPS/School/activity/reassignTeacher')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await educationManagementController.reassignActivityTeacher(
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
  schoolRouter.route('/SERPS/School/results/pending')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
        // *
        const result = await  educationManagementController.viewPendingResults()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/School/results/validate')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await educationManagementController.validatePendingResult(
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
  schoolRouter.route('/SERPS/School/registeredStudents')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await educationManagementController.viewRegisteredStudents()
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/School/registeredStudents/Student')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await educationManagementController.viewRegisteredStudent(
            req.body.studentID
        )
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/School/registeredStudents/Student/validate')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
      
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    // *
    const result = educationManagementController.validateRegisteredStudent(studentID)
    next()
}))

  // lectureNote API call routes
  schoolRouter.route('/SERPS/School/class/Subject/')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
        
        // *
        const lectureNotes = await documentsController.getLectureNotes(
            req.body.subject,
            req.body.classAlias
        )
        res.json(lectureNotes)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))
  schoolRouter.route('/SERPS/School/class/Subject/lectureNoteID')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    let result = null
    
    try {
    
        // *
        const lectureNote = await documentsController.getLectureNote(
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
  schoolRouter.route('/SERPS/School/class/Subject/lectureNote/validate')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await documentsController.validateLectureNote(
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

 
  schoolRouter.route('/SERPS/School/createGradeRanges')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
    try {
    
        // *
        const result = await educationManagementController.createGradeRanges(gradeData)//REVIEW
        res.json(result)
        
    } catch (e) {
        res.sendStatus(500).json(e)
    }
    next()
}))


schoolRouter.route('/SERPS/School/openAdmission')
.get(routeUtils.asyncMiddleware (async (req,res, next) => {

  winstonLogger.info('OPEN: ADMISSION')

  winstonLogger.info('REQUEST BODY')
  winstonLogger.info(JSON.stringify(req.body,null,4))

  try {
      // *
      const result = await schoolSessionController.openAdmission(
          req.body.schoolName,
          req.body.schoolID,
          req.body.public_ACCESS_CODE
      )
      if(result){
          winstonLogger.info('PAYLOAD')
          winstonLogger.info(JSON.stringify(result,null,4))
          
          res.json({
              state: 'success',
              statusCode: result.statusCode,
              Data: result.Data
          })
      }
  
  } catch (e) {

      winstonLogger.error('ERROR: opening admission')
      winstonLogger.error(e)

      res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Data: null
      })

  }

  next()  
  
}))

schoolRouter.route('/SERPS/School/closeAdmission')
.get(routeUtils.asyncMiddleware (async (req,res, next) => {

  winstonLogger.info('CLOSE: ADMISSION')

  winstonLogger.info('REQUEST BODY')
  winstonLogger.info(JSON.stringify(req.body,null,4))

  try {
      // *
      const result = await schoolSessionController.closeAdmission(
          req.body.schoolName,
          req.body.schoolID 
      )
      if(result){
          winstonLogger.info('PAYLOAD')
          winstonLogger.info(JSON.stringify(result,null,4))
          
          res.json({
              state: 'success',
              statusCode: result.statusCode,
              Data: result.Data
          })
      }
  
  } catch (e) {

      winstonLogger.error('ERROR: closing admission')
      winstonLogger.error(e)

      res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Data: null
      })

  }

  next()  
  
}))

schoolRouter.route('/SERPS/School/admission')
.get(routeUtils.asyncMiddleware (async (req,res, next) => {

  winstonLogger.info('GET: ADMISSION STATUS')

  winstonLogger.info('REQUEST BODY')
  winstonLogger.info(JSON.stringify(req.body,null,4))

  try {
      // *
      const result = await schoolSessionController.getAdmissionStatus(
          req.body.schoolName,
          req.body.schoolID
      )
      if(result){
          winstonLogger.info('PAYLOAD')
          winstonLogger.info(JSON.stringify(result,null,4))
          
          res.json({
              state: 'success',
              statusCode: result.statusCode,
              Data: result.Data
          })
      }
  
  } catch (e) {

      winstonLogger.error('ERROR: getting admission status')
      winstonLogger.error(e)

      res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Data: null
      })

  }

  next()  
  
}))

  module.exports = schoolRouter