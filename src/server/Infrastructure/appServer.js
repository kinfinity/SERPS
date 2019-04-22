/*
 * Created by Egbewatt Kokou <ksupro1@gmail.com>
 * Created on Apr 2019
 *
 * Copyright Â© 2019 Echwood Inc.
 * 
 *SERPS_SERVER
 *
 *    load services and create endpoints
 *  
 */

// Import configurations
import config from './utils/config';
import fs from 'fs';
import path from 'path';
import https from 'https';
import express from 'express';

// Log
console.log('STARTING APPLICATION SERPS_SERVER');

// permission certificate paths
const certsPath = path.join(`${__dirname}`, 'certs', 'server');

// SSL certificates
const options = {
    key: fs.readFileSync(path.join(`${certsPath}`, 'my-server.key.pem')),
    // This certificate should be a bundle containing your server certificate and any intermediates
    // cat certs/cert.pem certs/chain.pem > certs/server-bundle.pem
    cert: fs.readFileSync(path.join(`${certsPath}`, 'my-server.crt.pem')),
    // ca only needs to be specified for peer-certificates
  //, ca: [ fs.readFileSync(path.join(caCertsPath, 'my-root-ca.crt.pem')) ]
    requestCert: false,
    rejectUnauthorized: true
};

const server = https.createServer(options);
const app = require('./plugins/app');

    server.on('request', app);
    server.listen(config.serverPort);
    server.on('listening', function() {
        console.log('Listening on :' + server.address().port);
    });
