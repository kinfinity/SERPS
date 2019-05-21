/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchoolModel: () : notificationSchema
 * 
 */

const mongoose = require('../../Infrastructure/plugins/mongooseCon')
const notificationSchema = require('../schema/notificationSchema')

// Preparatory steps before save to model(pre-save)
notificationSchema.default.pre('save', function(next) {

    this.updated_at = new Date()
    if ( !this.created_at ) {
        this.created_at = new Date()
    }

    next()
    
})

export default mongoose.default.model('NotificationModel', notificationSchema.default)