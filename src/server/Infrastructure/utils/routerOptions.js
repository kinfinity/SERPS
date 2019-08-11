import auth from '../../interfaces/controllers/authorisationController'
import winstonLogger from './winstonLogger'
import publicEnums from '../../app/publicEnums';


const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
}

 // Options
 const routerOptions = {
        
}

/***
 * 
 * Check and authorise tokens on each path based on scope
 * the scope must match the route where it was called
 * Token with student scope wouldn't be validated on a Teacher route
 *  
 **/
const authSchool = async (req, res, next) => {
  
  winstonLogger.info('AUTHORISATION MIDDLEWARE')
  const bearerHeader = req.headers['x-access-token'] || req.headers['authorization']
  winstonLogger.info(`HEADERs: ${JSON.stringify(bearerHeader,null,4)}`)

  if(bearerHeader){
    const bearer = bearerHeader.split(' ') // .slice(7, token.length)
    const bearerToken = bearer[1]
    req.Token = bearerToken
    winstonLogger.info(`TOKEN: ${bearerToken}`)
    req.baseUrl // scope must match base url filtered and lowerCase e.g /School -> school
    
    //authorise token gotten
    const resx = await auth.authoriseSchoolAdmin(bearerToken)
    if(resx){
      winstonLogger.info('RES:')
      winstonLogger.info(JSON.stringify(resx,null,4))
      req.body.schoolName = resx.schoolName
      req.body.schoolID = resx. schoolID
      req.body.authorized = true
    }else{
      winstonLogger.info('__AUTHORIZED__: false')
      req.body.authorized = false
      res.json({})
    }
    
    if(req.body.authorized){
      winstonLogger.info('__AUTHORIZED__: true')
      next()
    }
  }else{
    res.json({
      statusCode: publicEnums.SERPS_STATUS_CODES.NO_TOKEN,
      Data: null
    })
  }
}

const authStudent = async (req, res, next) => {

  winstonLogger.info('AUTHORISATION MIDDLEWARE')
  const bearerHeader = req.headers['x-access-token'] || req.headers['authorization']
  winstonLogger.info(`HEADERs: ${JSON.stringify(bearerHeader,null,4)}`)

  if(bearerHeader){
    const bearer = bearerHeader.split(' ') // .slice(7, token.length)
    const bearerToken = bearer[1]
    req.Token = bearerToken
    winstonLogger.info(`TOKEN: ${bearerToken}`)
    req.baseUrl // scope must match base url filtered and lowerCase e.g /School -> school
    
    //authorise token gotten
    const resx = await auth.authoriseStudent(bearerToken)
    if(resx){
      winstonLogger.info('RES:')
      winstonLogger.info(JSON.stringify(resx,null,4))
      req.body.schoolName = resx.schoolName
      req.body.studentID = resx.studentID
      req.body.fullName = resx.fullName
      req.body.authorized = true
    }else{
      winstonLogger.info('__AUTHORIZED__: false')
      req.body.authorized = false
      res.json({})
    }
    
    if(req.body.authorized){
      winstonLogger.info('__AUTHORIZED__: true')
      next()
    }
  }else{
    res.json({
      statusCode: publicEnums.SERPS_STATUS_CODES.NO_TOKEN,
      Data: null
    })
  } 
}

const authParent = async (req, res, next) => {
    
  winstonLogger.info('AUTHORISATION MIDDLEWARE')
  const bearerHeader = req.headers['x-access-token'] || req.headers['authorization']
  winstonLogger.info(`HEADERs: ${JSON.stringify(bearerHeader,null,4)}`)

  if(bearerHeader){
    const bearer = bearerHeader.split(' ') // .slice(7, token.length)
    const bearerToken = bearer[1]
    req.Token = bearerToken
    winstonLogger.info(`TOKEN: ${bearerToken}`)
    req.baseUrl // scope must match base url filtered and lowerCase e.g /School -> school
    
    //authorise token gotten
    const resx = await auth.authoriseParent(bearerToken)
    if(resx){
      winstonLogger.info('RES:')
      winstonLogger.info(JSON.stringify(resx,null,4))
      req.body.parentName = resx.fullName
      req.body.parentID = resx.parentID
      req.body.authorized = true
    }else{
      winstonLogger.info('__AUTHORIZED__: false')
      req.body.authorized = false
      res.json({})
    }
    
    if(req.body.authorized){
      winstonLogger.info('__AUTHORIZED__: true')
      next()
    }
  }else{
    res.json({
      statusCode: publicEnums.SERPS_STATUS_CODES.NO_TOKEN,
      Data: null
    })
  } 
}

const authTeacher = async (req, res, next) => {
    
  winstonLogger.info('AUTHORISATION MIDDLEWARE')
  const bearerHeader = req.headers['x-access-token'] || req.headers['authorization']
  winstonLogger.info(`HEADERs: ${JSON.stringify(bearerHeader,null,4)}`)

  if(bearerHeader){
    const bearer = bearerHeader.split(' ') // .slice(7, token.length)
    const bearerToken = bearer[1]
    req.Token = bearerToken
    winstonLogger.info(`TOKEN: ${bearerToken}`)
    req.baseUrl // scope must match base url filtered and lowerCase e.g /School -> school
    
    //authorise token gotten
    const resx = await auth.authoriseTeacher(bearerToken)
    if(resx){
      winstonLogger.info('RES:')
      winstonLogger.info(JSON.stringify(resx,null,4))
      req.body.schoolName = resx.schoolName
      req.body.schoolID = resx.schoolID
      req.body.teacherName = resx.teacherName
      req.body.teacherID = resx.teacherID
      req.body.authorized = true
    }else{
      winstonLogger.info('__AUTHORIZED__: false')
      req.body.authorized = false
      res.json({}) 
    }
    
    if(req.body.authorized){
      winstonLogger.info('__AUTHORIZED__: true')
      next()
    }
  }else{
    res.json({
      statusCode: publicEnums.SERPS_STATUS_CODES.NO_TOKEN,
      Data: null
    })
  } 
}


export default {
  routerOptions,
  authStudent,
  authParent,
  authSchool,
  authTeacher,
  asyncMiddleware
}