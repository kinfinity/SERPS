
/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchoolModel: () : SchoolSchema
 * 
 */

const mongoose = require('../../Infrastructure/plugins/mongooseCon')
const SchoolSchema = require('../schema/schoolSchema')

// Preparatory steps before save to model(pre-save)
SchoolSchema.default.pre('save', function(next) {

    this.updated_at = new Date() 
    if (!this.created_at ) {
        this.created_at = new Date()
    }

    next()

})

export default mongoose.default.model('SchoolModel', SchoolSchema.default)