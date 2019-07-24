/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * TeacherModel: () : TeacherSchema
 * 
 */

const mongoose = require('../../Infrastructure/plugins/mongooseCon')
const TeacherSchema = require('../schema/teacherSchema')

// Preparatory steps before save to model(pre-save)
TeacherSchema.default.pre('save', function(next) {

    const now = new Date()
    this.updated_at = now
    if ( !this.created_at ) {
        this.created_at = now
    }

    next()
    
})

export default mongoose.default.model('TeacherModel', TeacherSchema.default)