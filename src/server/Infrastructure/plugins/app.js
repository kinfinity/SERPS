import express from 'express';
import fs from 'fs';


const app = express();

// On conditional require
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
const routersPath = '../routers';
const routerList = fs
        .readdirSync(`${__dirname}\\${routersPath}`)
        .filter((filename) => filename.match(/\.js$/));

//
routerList.forEach((routerName) => {

    routerName.trim();
    routerName.split('.')[0];
    routerName = `../routers/${routerName}`
    console.log(routerName);
    //
    const routerModule = wrapper.requireF(routerName);
   
    app.use(routerModule);

});

        

module.exports = app;