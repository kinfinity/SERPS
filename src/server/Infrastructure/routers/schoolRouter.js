import schoolService from '../services/school'
import routeUtils from '../utils/routerOptions'
import express from 'express'
import authorisationService from '../../domains/services/authorisationService'
import cloudinaryCon from '../plugins/cloudinaryCon'
import winstonLogger from '../utils/winstonLogger'
import shortid from 'shortid'
import csurf from 'csurf'
import publicEnums from '../../app/publicEnums'

winstonLogger.info('::::schoolRouter')

// winstonLogger.info('::::schoolRouter')
    /*      
     *  Build  school API call routes
     *  
     */
    // school router for all school calls
    const schoolRouter = express.Router([routeUtils.routerOptions])
    
    //Middleware
    // const csrfMiddleware = csurf({cookie: true})

    //
    // schoolRouter.use('/SERPS/School',routeUtils.authSchool())
    // schoolRouter.use(csrfMiddleware)
//
schoolRouter.route('/SERPS/School/signUp').get(routeUtils.asyncMiddleware(async (req,res,next) => {
  
    winstonLogger.info('SCHOOL-SIGNUP')
    
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
   
    const profiler = winstonLogger.startTimer()

    try{

        winstonLogger.info('REQUEST BODY')
        winstonLogger.info(JSON.stringify(req.body,null,4))
        
        const schoolID = req.body.schoolPrefix// + shortid.generate()

        winstonLogger.info("generated schoolID ")
        winstonLogger.info(schoolID)
        
        const payloadS = await schoolService.signupSchool({
            Name: req.body.Name,
            schoolID,
            email: req.body.email,
            password: req.body.password,
            motto: req.body.motto,
            Address: req.body.Address,
            Logo: 'tempURL',// Gets updated on Logo upload to cloudinary
            Images: req.body.imagesLinks // 1-3
        })

        // Persist Logo and images if school was created 
        if(payloadS.Token !== null ){

            winstonLogger.info('SAVE LOGO TO CLOUDINARY')
            // if it worked save the image to cloudinary with schoolName / profile
            const result = await cloudinaryCon.uploadSchoolLogo(req.body.Logo, req.body.Name, req.body.schoolPrefix).
            catch((e) => {

                winstonLogger.error('Error uploading Logo')
                winstonLogger.error(e)

            })

            winstonLogger.info('COUDLINARY RESULTS')
            winstonLogger.info(result)
            winstonLogger.info('END')

        }

        // Send the payload to client
        payloadS.state = 'success'
        res.json(payloadS)

    }catch(e) {
      
      winstonLogger.error(e)

      const payloadE = {
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
      }

      payloadE.state = 'failure'
       res.json(payloadE)

    }
    
    profiler.done({ message: 'End of school_signup'})
    
    next()

}))
  
schoolRouter.route('/SERPS/School/login').get(routeUtils.asyncMiddleware(async (req,res,next) => {

    winstonLogger.info('SCHOOL-LOGIN')
    
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

          const payload = await schoolService.authenticate({
            email: req.body.email || null,
            password: req.body.password,
            username: req.body.username || null
          })
          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)
          
      } catch (e) {

        winstonLogger.error(e)

        const payloadE = {
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        }

        payloadE.state = 'failure'
        res.json(payloadE)

      }

      next()

}))
  
// Non openAccess_Routes : require Access Token
  schoolRouter.route('/SERPS/School/logOut').get(routeUtils.asyncMiddleware (async (req,res, next) => {

        
    winstonLogger.info('SCHOOL-LOGOUT')
    
    if(req.body !== null) {

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
          //first authorize for this API
          const authResult = await authorisationService.authoriseToken(Token)
          if(!authResult){
              res.sendStatus(403).json()
          }
          winstonLogger.info(authResult)
          // authorisation should send back basic info to use for 

          // *
          const payload = await schoolService.signout({Token: req.body.Token})
          winstonLogger.info("PAYLOAD")
          winstonLogger.info(payload)

          payload.state = 'success'
          res.json(payload)

      } catch (e) {

        winstonLogger.error(e)

        const payloadE = {
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        }

        payloadE.state = 'failure'
        res.json(payloadE)

      }

      next()

}))

  // Info API routes
  schoolRouter.route('/SERPS/School')// profileInfo
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('GET: SCHOOL PROFILE')
    
    if(req.body !== null) {

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
        
        // * REVIEW to make sure schools can access only their school data when authorised
        const schoolProfileInfo = await schoolService.getProfileInfo(
          req.body.schoolName,
          req.body.schoolID
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(schoolProfileInfo)

        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
            Data: schoolProfileInfo
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

    next()

}))
  schoolRouter.route('/SERPS/School/contactInfo')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('GET: SCHOOL CONTACT_INFO')
    
    if(req.body !== null) {

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
        const schoolContactInfo = await schoolService.getContactInfo(
            Name = req.body.schoolName,
            schooolID = req.body.schoolID
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(schoolContactInfo)

        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
            Data: schoolContactInfo
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

    next()

}))
  schoolRouter.route('/SERPS/School/contactInfo/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    if(req.body === null ) {

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
        const result = await schoolService.updateContactInfo(
          ContactInfo = req.body.ContactInfo
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(result)

        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
            Data: result
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

    next()

}))

  // payment API routes
  schoolRouter.route('/SERPS/School/paymentInfo')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('GET: SCHOOL PAYMENT_INFO')
    
    if(req.body !== null) {

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
        const paymentInfo = await schoolService.getSchoolPaymentInfo(
            Name = req.body.SchoolName,
            schoolID = req.body.SchoolID
        )
        winstonLogger.info('PAYLOAD')
        wintsonLogger.info(paymentInfo)

        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
            Data: paymentInfo
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

    next()

}))
  schoolRouter.route('/SERPS/School/paymentInfo/update')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('UPDATE: SCHOOL PAYMENT_INFO')
    
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
        const result = await schoolService.updateSchoolPaymentInfo(
            req.body.schoolName,
            req.body.schoolID,
            PaymentInfoData = {
                bankName: req.body.bankName,
                AccountNumber: req.body.AccountNumber
            }
        )
        winstonLogger.info('PAYLOAD')
        winstonLogger.info(result)

        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_OK,
            Data: result
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

    next()

}))
  schoolRouter.route('/SERPS/School/paymentInfo/transactionHistory') // REVIEW SEND BY DATE
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('GET: SCHOOL TRANSACTION_HISTORY')
    
    if(req.body !== null) {

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
        const transactionHistory = await schoolService.viewSchoolPaymentTransactionHistory(
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

  // notification API routes
  schoolRouter.route('/SERPS/School/notifications')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {
      
    winstonLogger.info('GET: SCHOOL NOTIFICATIONS')
    
    if(req.body !== null) {

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
        const notifications = await schoolService.getNotifications(
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

    next()

}))
  schoolRouter.route('/SERPS/School/notifications/create')
  .get(routeUtils.asyncMiddleware (async (req,res, next) => {

    winstonLogger.info('CREATE: SCHOOL NOTIFICATION')
    
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
        const result = await schoolService.createNotification(//noteTitle,noteID,noteImage,noteText
            schoolName = req.body.schoolName,
            schoolID = req.body.schoolID,
            noteTitle = req.body.noteTitle,
            noteID = req.body.imageLink,
            noteImage = req.body.Note,
            noteText = req.body.noteText
        )

        res.json({
            state: 'success',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_PARAM_ERROR,
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
        const result = await schoolService.updateNotification(//SchoolName,SchoolID,noteID,Data
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
  schoolRouter.route('/SERPS/School/notifications/delete')
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
        const result = await schoolService.deleteNotification(
            schoolName = req.body.schoolName,
            schoolID = req.body.schoolID,
            noteTitle = req.body.noteTitle,
            noteID = req.body.noteID
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
      const results = await schoolService.createSchoolSession(
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
      const results = await schoolService.activateNextTerm(
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
  schoolRouter.route('/SERPS/School/:class/createTimetable')
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
        const result = schoolService.createTimetable(
            schoolName = req.body.schoolName,
            schoolID = req.body.schoolID,
            classAlias = req.body.classAlias,
            timeTableData = req.body.timeTableData //REVIEW
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
  schoolRouter.route('/SERPS/School/:class/getTimetable')
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
  schoolRouter.route('/SERPS/School/:class/updateTimetable')
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
  schoolRouter.route('/SERPS/School/:class/deleteTimetable')
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
  schoolRouter.route('/SERPS/School/:class/archiveTimetable')
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
  schoolRouter.route('/SERPS/School/createClass')
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
  schoolRouter.route('/SERPS/School/createClassSequence')
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
  schoolRouter.route('/SERPS/School/:class')
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
  schoolRouter.route('/SERPS/School/:class/createSubject')
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
  schoolRouter.route('/SERPS/School/:class/Subject')
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
  schoolRouter.route('/SERPS/School/:class/update')
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
  schoolRouter.route('/SERPS/School/:class/Subject')
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
  schoolRouter.route('/SERPS/School/:class/remove')
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
  schoolRouter.route('/SERPS/School/:class/Subject/remove')
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
  schoolRouter.route('/SERPS/School/:class/assignTeacher')
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
  schoolRouter.route('/SERPS/School/:class/reassignTeacher')
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
  schoolRouter.route('/SERPS/School/activity/create')
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
  schoolRouter.route('/SERPS/School/:activity')
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
  schoolRouter.route('/SERPS/School/:activity/update')
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
  schoolRouter.route('/SERPS/School/:activity/remove')
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
  schoolRouter.route('/SERPS/School/:activity/assignTeacher')
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
  schoolRouter.route('/SERPS/School/:activity/reassignTeacher')
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
  schoolRouter.route('/SERPS/School/results/pending')
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
  schoolRouter.route('/SERPS/School/results/validate')
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
  schoolRouter.route('/SERPS/School/registeredStudents')
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
  schoolRouter.route('/SERPS/School/registeredStudents/Student')
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
  schoolRouter.route('/SERPS/School/registeredStudents/Student/validate')
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
  schoolRouter.route('/SERPS/School/:class/Subject/')
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
  schoolRouter.route('/SERPS/School/:class/Subject/:lectureNoteID')
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
  schoolRouter.route('/SERPS/School/:class/Subject/:lectureNote/validate')
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
  schoolRouter.route('/SERPS/School/createClassSequence')
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
  schoolRouter.route('/SERPS/School/createGradeRanges')
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