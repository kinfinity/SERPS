/*
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Fri Apr 12 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 */
import fs from 'fs'
import path from 'path'

export default class Service {
    static registerServices (app) {
        var servicesDir = path.resolve(__dirname)
        var services = fs.readdirSync(servicesDir)

        // Remove this file
        services.splice(services.indexOf(__filename), 1)

        services.forEach(serviceFile => {
            var service = require(path.resolve(servicesDir, serviceFile)).default
            var serviceName = serviceFile.split('.')[0]
            console.log(`Registering service: ${serviceName}`)
            app.use(serviceName, service)
        })
        console.log('All Services Registered!')
    }
}
