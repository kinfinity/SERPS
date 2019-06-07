import auth from '../services/auth'
import winstonLogger from './winstonLogger'


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

  if(typeof bearerHeader === 'undefined' ){
      res.status(403).json()//forbidden
  }
  const bearer = bearerHeader.split(' ') // .slice(7, token.length)
  bearerToken = bearer[1]
  req.Token = bearerToken
  winstonLogger.info(`TOKEN: ${bearerToken}`)
  req.baseUrl // scope must match base url filtered and lowerCase e.g /School -> school

  next()  

}

const authStudent = asyncMiddleware(async (req, res, next) => {
    
})

const authParent = asyncMiddleware(async (req, res, next) => {
    
})

const authTeacher = asyncMiddleware(async (req, res, next) => {
    
})


export default {
  routerOptions,
  authStudent,
  authParent,
  authSchool,
  authTeacher,
  asyncMiddleware
}