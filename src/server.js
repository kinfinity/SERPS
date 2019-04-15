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
import Services from './services'

var app = express(feathers())

// Register $ Configure Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());
app.configure(socketio())
app.use(express.errorHandler());
Services.registerServices(app)

app.listen(config.port, config.host, () => {
    console.log(`SERPS Magic happens on port ${config.port}`)
})

