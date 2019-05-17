import schoolService from '../services/school'
import routeUtils from '../utils/routerOptions'
import express from 'express'
import authorisationService from '../../domains/services/authorisationService'
import cloudinaryCon from '../plugins/cloudinaryCon'
import winstonLogger from '../utils/winstonLogger'
import shortid from 'shortid'
/**
     * 
     *  Build  school API call routes
     *  
     */

  // school router for all school calls
  const openAccessRouter = express.Router([routeUtils.routerOptions])

  // OpenAccess_routes : don't require accessToken
  openAccessRouter.route('/SERPS/School/signUp').get(routeUtils.asyncMiddleware(async (req,res,next) => {
    
    winstonLogger.profile('school_signup')
    const profiler = winstonLogger.startTimer()

    try{

        winstonLogger.info('REQUEST BODY')
        winstonLogger.info(req.body)
        
        const schoolID = req.body.schoolPrefix? req.body.schoolPrefix + shortid.generate() : req.body.Name

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
        res.json(payloadS)

    }catch(e) {
      
      winstonLogger.error(e)

      const payloadE = {
          statusCode: 'SC102',
          Token: null
      }
      res.json(payloadE)
    }
    
    profiler.done({ message: 'End of school_signup'})
    
    next()

}))
  
openAccessRouter.route('/SERPS/School/login').get(routeUtils.asyncMiddleware(async (req,res,next) => {
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
  
openAccessRouter.route('/SERPS/:School/logOut').get(routeUtils.asyncMiddleware (async (req,res, next) => {
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


  module.exports = openAccessRouter