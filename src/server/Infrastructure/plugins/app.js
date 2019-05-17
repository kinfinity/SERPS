
import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import winstonLogger from '../utils/winstonLogger'
import routeUtils from '../utils/routerOptions'


// middle-ware options
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
const helmetOptions = {}


const app = express().
             use(cors(corsOptions)).
             use(helmet(helmetOptions)).
             use(cookieParser).
             use(bodyParser.json())
            
  

app.use(helmet.hidePoweredBy({ setTo: 'Echwood' }))


// On conditional require
const wrapper = {

    requireF: (modulePath) => {

        try {

            return require (modulePath)

        } catch (err) {

            winstonLogger.log({
                level: 'error',
                message: `requireF(): The file ${modulePath} could not be loaded :: ${err}`
            })

            return false

        }

    }

}

// 
const routersPath = '../routers'
const routerList = fs
        .readdirSync(`${__dirname}\\${routersPath}`)
        .filter((filename) => filename.match(/\.js$/))

//
routerList.forEach((routerName) => {

    routerName.trim()
    routerName.split('.')[0]
    routerName = `../routers/${routerName}`
    
    // Default route
    app.use('/', routeUtils.asyncMiddleware(async(req,res,next) => next()))

    // csrfToken generation Route
    app.use('/csrf/:id/gen', routeUtils.asyncMiddleware(async(req,res,next) => {

        next()

    }))

    const routerModule = wrapper.requireF(routerName)
    app.use(routerModule)

})

module.exports = app