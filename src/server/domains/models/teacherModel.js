/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * TeacherModel: () : TeacherSchema
 * 
 */

const mongoose = require('../../Infrastructure/server/plugins/mongooseCon');
const TeacherSchema = require('../schema/teacherSchema');

// Preparatory steps before save to model(pre-save)
TeacherSchema.pre('save', function(next) {
    next();
});

export default mongoose.model('TeacherModel', TeacherSchema);