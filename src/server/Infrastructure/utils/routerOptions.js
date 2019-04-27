
 // Options
 const routerOptions = {
        
};
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined'){
        res.status(403).json();//forbidden
    }
    const bearer = bearerHeader.split(' ');
    bearerToken = bearer[1];
    req.Token = bearerToken;
    next();  
};
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

module.exports = {routerOptions,verifyToken,asyncMiddleware};