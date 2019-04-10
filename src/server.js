/*
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Mon Apr 08 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 */

import  feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import config from '../config'

var app = express(feathers())

// Register $ Configure Middlewares
app.configure(socketio())

app.listen(config.port, config.host, () => {
    console.log(`SERPS magic happens on port ${config.port}`)
})

