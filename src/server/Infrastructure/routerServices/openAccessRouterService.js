import routeUtils from '../utils/routerOptions'
import express from 'express'
import cloudinaryCon from '../plugins/cloudinaryCon'
import winstonLogger from '../utils/winstonLogger'
import jsStringCompression from 'js-string-compression'
import publicEnums from '../../app/publicEnums'
import signUpController from '../../interfaces/controllers/signUpController'
import authenticationController from '../../interfaces/controllers/authenticationController'

/**
 * base64 image strings are compress b4 sent to server
 * so we decompress them first 
 * 
 */
const hm = new jsStringCompression.Hauffman()

/**
     * 
     *  Build  school API call routes
     *  
     */


  // free access endpoints for authentication
  const openAccessRouterService = express.Router([routeUtils.routerOptions])

  // OpenAccess_routes : don't require accessToken
  openAccessRouterService.route('/SERPS/schoolSignUp').get(routeUtils.asyncMiddleware(async (req,res,next) => {
  
    winstonLogger.info('SCHOOL-SIGNUP')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
   
    const profiler = winstonLogger.startTimer()

    try{

        const schoolID = req.body.schoolPrefix// + shortid.generate()

        winstonLogger.info("generated schoolID ")
        winstonLogger.info(schoolID)
        
        // create school
        const payloadS =  await signUpController.createSchool({
          Name: req.body.Name,
          schoolID,
          email: req.body.email,
          password: req.body.password,
          motto: req.body.motto,
          Address: req.body.Address,
          Logo: 'tempURL',// Gets updated on Logo upload to cloudinary
          Images: req.body.imagesLinks // 1-3
      })
    
      if(payloadS){
          
         // done with SIGNUP
         // authenticate school -> creates token
         const payloadA = await authenticationController.authenticateSchoolAdmin({
             detail: payloadS.email,
             password: payloadS.password
         }).
         catch((err) => {
     
             winstonLogger.error('ERROR: authentication')
             winstonLogger.error(err.stack)
     
         })
     
         winstonLogger.info("SIGNUP PAYLOAD")
         winstonLogger.info(JSON.stringify(payloadA))

        payloadS.state = 'failure'
        // Persist Logo and images if school was created 
        if(payloadS.Token !== null ){

            winstonLogger.info('SAVE LOGO TO CLOUDINARY')
            // if it worked save the image to cloudinary with schoolName / profile # hm.decompress(req.body.Logo)
            const result = await cloudinaryCon.uploadSchoolLogo(req.body.Logo, req.body.Name, req.body.schoolPrefix).
            catch((e) => {

                winstonLogger.error('Error uploading Logo')
                winstonLogger.error(e.stack)

            })

            winstonLogger.info('COUDLINARY RESULTS')
            winstonLogger.info(result)
            winstonLogger.info('END')
            payloadS.state = 'success'  

        }

        // Send the payload to client
        res.json(payloadS)

    }
    else{

        winstonLogger.info('INFO: user not created')
          res.json({
            state: 'failure',
            statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
            Token: null
       })

    }
  } catch(e){

    winstonLogger.error('ERROR: signup failed')
    winstonLogger.error(e.stack)
    res.json({
      state: 'failure',
      statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
      Token: null
    })

  }
          
    profiler.done({ message: 'End of school_signup'})
    
    next()

}))
  
openAccessRouterService.route('/SERPS/schoolLogin').get(routeUtils.asyncMiddleware(async (req,res,next) => {

    winstonLogger.info('SCHOOL-LOGIN')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
   
      try {
          
          // *
          const payload = await authenticationController.authenticateSchoolAdmin(
            req.body.detail,
            req.body.password
          )
          winstonLogger.info("PAYLOAD")
          winstonLogger.info(JSON.stringify(payload))
          payload.state = 'failure'
          if(payload){
            payload.state = 'success'
          }
          res.json(payload)

      } catch (e) {

        winstonLogger.error('ERROR: authentication')
        winstonLogger.error(e.stack)

        res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
        })

      }

      next()

}))

// Student   
openAccessRouterService.route('/SERPS/studentSignUp').get(routeUtils.asyncMiddleware(async(req,res,next) => {
    
    winstonLogger.info('STUDENT-SIGNUP')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
   
    const profiler = winstonLogger.startTimer()

    try{
        //


        const payloadS = await signUpController.createStudent({
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
        
        // done with SIGNUP 
        const payloadA = await authenticationController.authenticateStudent(
            payloadS.Data.email,
            payloadS.Data.password
        )
        payloadA.state = 'failure'
        if(payloadA){
          payloadA.state = 'success'
        }
        // Send the payload to client
        res.json(payloadA)
    
      }else{

        winstonLogger.info('INFO: user not created')
        res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
       })

      }
        
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
  
  }))
  openAccessRouterService.route('/SERPS/studentLogin').get(routeUtils.asyncMiddleware (async(req,res,next) => {
     
    winstonLogger.info('STUDENT-LOGIN')
    
    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
   
      try {
          
          // 
          const payload = await authenticationController.authenticateStudent(
            req.body.email,
            req.body.password
          )
          payload.state = 'failure'
          if(payload.Token){
            payload.state = 'success'
          }
          res.json(payload)
          
      } catch (e) {

        winstonLogger.error('ERROR: authentication')
        winstonLogger.error(e.stack)

        res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
        })

      }

      next()

  }))

  // Parent
openAccessRouterService.route('/SERPS/parentSignUp').get(routeUtils.asyncMiddleware(async(req,res,next) => {
    
    winstonLogger.info('PARENT-SIGNUP')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
   
    const profiler = winstonLogger.startTimer()

    try{
      // create parent
      const payloadS = await signUpController.createParent({
        Name: req.body.Name,
        schoolName: req.body.schoolName,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        Address: req.body.Address
    })

      if(payloadS){
          // done with SIGNUP 
        const payloadA = await authenticationController.authenticateParent(
            payloadS.Data.email,
            payloadS.Data.password
        )
        payloadA.state = 'failure'
          if(payloadA.Token){
            payloadA.state = 'success'
          }
        res.json(payloadA)

      }else{
       
        winstonLogger.info('INFO: user not created')
        res.json({
          state: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
       })

      }
 
    }catch(e) {
      
      winstonLogger.error('ERROR: signUp')
      winstonLogger.error(e.stack)

       res.json({
        status: 'failure',
          statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
          Token: null
      })

    }
    
    profiler.done({ message: 'End of student_signin'})
    
    next()
  
  }))
  openAccessRouterService.route('/SERPS/parentLogin').get(routeUtils.asyncMiddleware (async(req,res,next) => {
     
    winstonLogger.info('PARENT-LOGIN')

    winstonLogger.info('REQUEST BODY')
    winstonLogger.info(JSON.stringify(req.body,null,4))
   
    try {
          
      // 
      const payload = await authenticationController.authenticateParent(
        req.body.detail,
        req.body.password
      )
      payload.state = 'failure'
      if(payload.Token){
        payload.state = 'success'
      }
      res.json(payload)
        
    } catch (e) {

      winstonLogger.error('ERROR: authentication')
      winstonLogger.error(e.stack)

      res.json({
        state: 'failure',
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Token: null
      })

    }

      next()

  }))
  
  //Teacher authentication Routes
openAccessRouterService.route('/SERPS/teacherSignUp').get(routeUtils.asyncMiddleware(async(req,res,next) => {
    
  winstonLogger.info('TEACHER-SIGNUP')

  winstonLogger.info('REQUEST BODY')
  winstonLogger.info(JSON.stringify(req.body,null,4))
 
  const profiler = winstonLogger.startTimer()

  try{

    // create parent
    const payloadS = await signUpController.createTeacher({
      Name: req.body.Name,
      schoolName: req.body.schoolName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      Address: req.body.Address
    })

    if(payloadS){
        // done with SIGNUP 
      const payloadA = await authenticationController.authenticateTeacher(
          payloadS.Data.email,
          payloadS.Data.password
      )
      payloadA.state = 'failure'
        if(payloadA.Token){
          payloadA.state = 'success'
        }
      res.json(payloadA)

    }else{
     
      winstonLogger.info('INFO: user not created')
      res.json({
        state: 'failure',
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Token: null
     })

    }

  }catch(e) {
    
    winstonLogger.error('ERROR: signUp')
    winstonLogger.error(e.stack)

     res.json({
      status: 'failure',
        statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        Token: null
    })

  }
  
  profiler.done({ message: 'End of teacher_signup'})
  
  next()

}))
openAccessRouterService.route('/SERPS/teacherLogin').get(routeUtils.asyncMiddleware (async(req,res,next) => {
   
  winstonLogger.info('TEACHER-LOGIN')

  winstonLogger.info('REQUEST BODY')
  winstonLogger.info(JSON.stringify(req.body,null,4))
 
  try {
          
    // 
    const payload = await authenticationController.authenticateTeacher(
      req.body.detail,
      req.body.password
    )
    payload.state = 'failure'
    if(payload.Token){
      payload.state = 'success'
    }
    res.json(payload)
    
  } catch (e) {

    winstonLogger.error('ERROR: authentication')
    winstonLogger.error(e.stack)

    res.json({
      state: 'failure',
      statusCode: publicEnums.SERPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
      Token: null
    })

  }

    next()

}))

  module.exports = openAccessRouterService