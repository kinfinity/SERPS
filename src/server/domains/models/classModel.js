/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * ClassModel: () : ClassSchema
 * 
 */

const mongoose = require('../../Infrastructure/plugins/mongooseCon');
const ClassSchema = require('../schema/classSchema');

// Preparatory steps before save to model(pre-save)
ClassSchema.default.pre('save', function(next) {
    
    this.updated_at = new Date() 
    if (!this.created_at ) {
        this.created_at = new Date()
    }

    next();

});

export default mongoose.default.model('ClassModel', ClassSchema);