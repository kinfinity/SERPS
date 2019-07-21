import schoolService from '../services/school'
import studentService from '../services/student'
import parentService from '../services/parent'
import routeUtils from '../utils/routerOptions'
import express from 'express'
import authorisationService from '../../domains/services/authorisationService'
import cloudinaryCon from '../plugins/cloudinaryCon'
import winstonLogger from '../utils/winstonLogger'
import shortid from 'shortid'
import jsStringCompression from 'js-string-compression'
import publicEnums from '../../app/publicEnums'

winstonLogger.info('::::openAccessRouter')

/**
 * base64 image strings are compress b4 sent to server
 * so we decompress them first 
 * 
 */
const hm = new jsStringCompression.Hauffman()

    //Middleware
    // const csrfMiddleware = csurf({cookie: true})

/**
     * 
     *  Build  school API call routes
     *  
     */


  // school router for all school calls
  const openAccessRouter = express.Router([routeUtils.routerOptions])

  // OpenAccess_routes : don't require accessToken
  openAccessRouter.route('/SERPS/schoolSignUp').get(routeUtils.asyncMiddleware(async (req,res,next) => {
  
    winstonLogger.info('SCHOOL-SIGNUP')
    
    if(!req.body) {

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
            // if it worked save the image to cloudinary with schoolName / profile # hm.decompress(req.body.Logo)
            const result = await cloudinaryCon.uploadSchoolLogo(req.body.Logo, req.body.Name, req.body.schoolPrefix).
            catch((e) => {

                winstonLogger.error('Error uploading Logo')
                winstonLogger.error(e)

            })

            winstonLogger.info('COUDLINARY RESULTS')
            winstonLogger.info(result)
            winstonLogger.info('END')
            payloadS.state = 'success'  

        }else{
          payloadS.state = 'failure'
        }

        // Send the payload to client
        res.json(payloadS)

    }catch(e) {
      
        winstonLogger.error('ERROR: signUp')
        winstonLogger.error(e)

        res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
        })

    }
    
    profiler.done({ message: 'End of school_signup'})
    
    next()

}))
  
openAccessRouter.route('/SERPS/schoolLogin').get(routeUtils.asyncMiddleware(async (req,res,next) => {

    winstonLogger.info('SCHOOL-LOGIN')
    
    if(!req.body) {

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
            detail: req.body.detail,
            password: req.body.password
          })
          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload))

          if(payload){
            payload.state = 'success'
            res.json(payload)
          }

      } catch (e) {

        winstonLogger.error('ERROR: authentication')
        winstonLogger.error(e)

        res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
        })

      }

      next()

}))

// Authentication routes  
openAccessRouter.route('/SERPS/studentSignUp').get(routeUtils.asyncMiddleware(async(req,res,next) => {
    
    winstonLogger.info('STUDENT-SIGNUP')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
   
    // const profiler = winstonLogger.startTimer()

    try{
        
      // schoolName,schoolID,publicIdentifier,Name,email,password,gender,birthDate
        const payloadS = await studentService.signupStudent({
            schoolName: req.body.schoolName,  
            publicIdentifier: req.body.publicIdentifier,
            Name: req.body.Name,
            gender: req.body.gender,
            birthDate: req.body.birthDate,
            email: req.body.email,
            password: req.body.password,
            classAlias: req.body.classAlias
        })
        if(payloadS){
          payloadS.state = 'success'
          winstonLogger.info(JSON.stringify(payloadS,null,4))
        }
        // Send the payload to client
        res.json(payloadS)

    }catch(e) {
      
      winstonLogger.error('ERROR: signUp')
      winstonLogger.error(e.stack)

       res.json({
        status: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
      })

    }
    
    // profiler.done({ message: 'End of student_signup'})
  
  }))
  openAccessRouter.route('/SERPS/studentLogin').get(routeUtils.asyncMiddleware (async(req,res,next) => {
     
    winstonLogger.info('STUDENT-LOGIN')
    
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

          const payload = await studentService.authenticate({
            email: req.body.email,
            password: req.body.password
          })
          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))

          payload.state = 'success'
          res.json(payload)
          
      } catch (e) {

        winstonLogger.error('ERROR: authentication')
        winstonLogger.error(e)

        res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
        })

      }

      next()

  }))


  
// Authentication routes
openAccessRouter.route('/SERPS/parentSignUp').get(routeUtils.asyncMiddleware(async(req,res,next) => {
    
    winstonLogger.info('PARENT-SIGNUP')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
   
    const profiler = winstonLogger.startTimer()

    try{
        
        const payloadS = await parentService.signupParent({
            Name: req.body.Name,
            schoolName: req.body.schoolName,
            email: req.body.email,
            password: req.body.password,
    	      gender: req.body.gender,
            birthDate: req.body.birthDate,
            Address: req.body.Address
        })

        // Send the payload to client
        payloadS.state = 'success'
        res.json(payloadS)

    }catch(e) {
      
      winstonLogger.error('ERROR: signUp')
      winstonLogger.error(e.stack)

       res.json({
        status: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
      })

    }
    
    profiler.done({ message: 'End of student_signup'})
    
    next()
  
  }))
  openAccessRouter.route('/SERPS/parentLogin').get(routeUtils.asyncMiddleware (async(req,res,next) => {
     
    winstonLogger.info('PARENT-LOGIN')
    
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

          const payload = await parentService.authenticate({
            email: req.body.email,
            password: req.body.password
          })
          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload,null,4))

          payload.state = 'success'
          res.json(payload)
          
      } catch (e) {

        winstonLogger.error('ERROR: authentication')
        winstonLogger.error(e)

        res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
        })

      }

      next()

  }))

  module.exports = openAccessRouter