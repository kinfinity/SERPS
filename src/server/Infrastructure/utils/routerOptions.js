import auth from '../services/auth'


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
const authSchool = asyncMiddleware(async (req, res, next) => {
  
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader === 'undefined' ){
      res.status(403).json()//forbidden
  }
  const bearer = bearerHeader.split(' ')
  bearerToken = bearer[1]
  req.Token = bearerToken
  req.baseUrl // scope must match base url filtered and lowerCase e.g /School -> school

  next()  

})

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