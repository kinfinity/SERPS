
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import helmet from 'helmet'
import winstonLogger from '../utils/winstonLogger'
import routeUtils from '../utils/routerOptions'
import publicEnums from '../../app/publicEnums'


// middle-ware options
const corsOptions = {
    "origin": "*",
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,crsf-token,x-csrf-token',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

const helmetOptions = {}
// app.use(helmet());
// app.use(helmet.xssFilter({ setOnOldIE: true }));
// app.use(helmet.frameguard('deny'));
// app.use(helmet.hsts({maxAge: 7776000000, includeSubdomains: true}));
// app.use(helmet.hidePoweredBy());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.noCache());

const app = express().
            use(cors(corsOptions)).
            //  use(helmet(helmetOptions)).
            use(cookieParser).
            use(bodyParser.json()).
            use(bodyParser.urlencoded({
                extended: true//true
            })).
            use(helmet.hidePoweredBy({ setTo: 'Echwood' }))


  
// Handle app errors
app.use(function (err, req, res, next) {

    if(err){

        winstonLogger.error("ENCOUNTERED ERROR:")
        winstonLogger.error(err.code)
        winstonLogger.error(err.message)
        winstonLogger.error(err.stack)

    }
    winstonLogger.error(err.message)
    if (err.code == 'EBADCSRFTOKEN'){
        // handle CSRF token error
        winstonLogger.error('CSRF TOKEN TAMPERED WITH')
        res.json({
            state: 'FAILURE',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            statusMessage: publicEnums.SERPS_STATUS_MESSAGES.CSRF_ERROR,
            Token: null
        })

    }else if(err.code == 'ERR_ASSERTION'){
        // handle CSRF token error
        winstonLogger.error('ERR_ASSERTION')
        res.json({
            state: 'FAILURE',
            statusCode: publicEnums.SERPS_STATUS_CODES.REQUEST_ERROR,
            statusMessage: publicEnums.SERPS_STATUS_MESSAGES.ASSERTION_ERR,
            Token: null
        })

    }
    return next(err)

})


// On conditional require
const wrapper = {

    requireF: (modulePath) => {

        try {

            return require (modulePath)

        } catch (err) {

            winstonLogger.log({
                level: 'error',
                message: `requireF(): The file ${modulePath} could not be loaded :: ${err.stack}`
            })

            return false

        }

    }

}

// 
const routersPath = '../routerServices/'
const routerList = fs
        .readdirSync(`${__dirname}//${routersPath}`)
        .filter((filename) => filename.match(/\.js$/))

let index_ = 0
//
routerList.forEach((routerName) => {

    winstonLogger.info(`routerService[${index_}]: ${routerName}`)
    index_ += 1
    routerName.trim()
    routerName.split('.')[0]
    routerName = `../routerServices/${routerName}`

    const routerModule = wrapper.requireF(routerName)
    app.use(routerModule)

})


// const crsfRouterService = express.Router([routeUtils.routerOptions])
// crsfRouterService.route('/SERPS/csrfTOKENS').get(routeUtils.csrfHandler.csrfTokenGenerate)
// crsfRouterService.route('/SERPS/csrfTOKENS').post(routeUtils.csrfHandler.csrfTokenVerify)
// app.use(crsfRouterService)

app.get('/SERPS/csrfTOKENS', routeUtils.csrfHandler.csrfMiddleware, function(req, res) {
    // pass the csrfToken to the view
    res.send({ csrfToken: req.csrfToken() })
})
app.post('/SERPS/csrfTOKENS', routeUtils.csrfHandler.csrfMiddleware,routeUtils.csrfHandler.csrfTokenVerify)
app.route('/').get(async (req,res) => {

    res.render("CADLIX HOME")
})

module.exports = app