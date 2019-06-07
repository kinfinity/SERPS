
/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchooCalendarModel: () : SchoolCalendarSchema
 * 
 */

const mongoose = require('../../Infrastructure/plugins/mongooseCon')
const SchoolCalendarSchema = require('../schema/schoolCalendarSchema')

// Preparatory steps before save to model(pre-save)
SchoolCalendarSchema.default.pre('save', function(next) {

    this.updated_at = new Date() 
    if (!this.created_at ) {
        this.created_at = new Date()
    }

    next()

})

export default mongoose.default.model('SchoolModel', SchoolCalendarSchema.default)