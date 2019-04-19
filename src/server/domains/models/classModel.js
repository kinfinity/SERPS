/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * ClassModel: () : ClassSchema
 * 
 */

const mongoose = require('../../Infrastructure/server/plugins/mongooseCon');
const ClassSchema = require('../schema/classSchema');

// Preparatory steps before save to model(pre-save)
ClassSchema.pre('save', function(next) {
    next();
});

export default mongoose.model('ClassModel', ClassSchema);