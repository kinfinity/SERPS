/**
 * #k_infinityIII@Echwood
 *
 *ARRMS_SERVER
 *
 *    load ENV variables
 *    DB connections : Mongoose
 *    load services and create endpoints
 *  
 */

// Import configurations
import config from './utils/config';
import fs from 'fs';
import path from 'path';
import https from 'https';
import express from 'express';
// import serviceFacade from './utils/serviceFacade';
import checkip from 'check-ip-address';

// Log
console.log('STARTING APPLICATION ARRMS_SERVER');

// permission certificate paths
const certsPath = path.join(`${__dirname}`, 'certs', 'server');
const caCertsPath = path.join(`${__dirname}`, 'certs', 'ca');

// SSL certificates
const options = {
    key: fs.readFileSync(path.join(certsPath, 'my-server.key.pem')),
    // This certificate should be a bundle containing your server certificate and any intermediates
    // cat certs/cert.pem certs/chain.pem > certs/server-bundle.pem
    cert: fs.readFileSync(path.join(certsPath, 'my-server.crt.pem')),
    // ca only needs to be specified for peer-certificates
  //, ca: [ fs.readFileSync(path.join(caCertsPath, 'my-root-ca.crt.pem')) ]
    requestCert: false,
    rejectUnauthorized: true
};

const server = https.createServer(options);

checkip.getExternalIp().then(function (ip) {
  
    const host = ip || 'hostIP';

    function listen(app) {
        server.on('request', app);
        server.listen(config.serverPort, function () {
        const port = server.address().port;
        console.log('Listening on :' + port);
        if (ip) {
            console.log('Listening on https://' + ip + ':' + port);
        }
        });
    }

    const publicDir = path.join(`${__dirname}`, 'public');
    const app = require('./utils/app').create(server, host, port, publicDir);
    listen(app);

    // On conditional require for {service}.js files
    const wrapper = {

        requireF: (modulePath) => {

            try {

                return require (modulePath);

            } catch (err) {

                console
                    .log(`requireF(): The file ${modulePath} could not be loaded :: ${err}`);

                return false;

            }

        }

    };
    
    // 
    const servicePath = './services';
    const serviceFileList = fs
            .readdirSync(`${__dirname}\\${servicePath}`);
    //
    serviceFileList.forEach((serviceName) => {

        //
        const serviceImplementation = wrapper.requireF(serviceName);
        app.use(`./${serviceName}`,serviceImplementation);

    });


});

