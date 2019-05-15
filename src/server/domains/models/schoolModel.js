
/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchoolModel: () : SchoolSchema
 * 
 */

const mongoose = require('../../Infrastructure/plugins/mongooseCon');
const SchoolSchema = require('../schema/schoolSchema');

// Preparatory steps before save to model(pre-save)
SchoolSchema.default.pre('save', function(next) {
    next();
});

export default mongoose.default.model('SchoolModel', SchoolSchema.default);