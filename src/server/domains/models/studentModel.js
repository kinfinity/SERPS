/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * StudentModel: () : StudentSchema
 * 
 */

const mongoose = require('../../Infrastructure/plugins/mongooseCon')
const StudentSchema = require('../schema/studentSchema')

// Preparatory steps before save to model(pre-save)
StudentSchema.default.pre('save', function(next) {

    now = new Date()
    this.updated_at = now
    if ( !this.created_at ) {
        this.created_at = now
    }

    next()
    
})

export default mongoose.default.model('StudentModel', StudentSchema.default)