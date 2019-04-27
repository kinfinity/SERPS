/*
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Mon Apr 08 2019
 *
 * Copyright © 2019 Echwood Inc.
 */

 const nodemon =  require('nodemon')
require = require('esm')(module)

// nodemon({
//     script: require('./src/server/Infrastructure/appServer'),
//     stdout: false // output to console
// }).on('readable', function() { 
//     this.stdout.pipe(fs.createWriteStream('./logs/output.txt'));
//     this.stderr.pipe(fs.createWriteStream('./logs/err.txt')); 
// });

module.exports = require('./src/server/Infrastructure/appServer')
