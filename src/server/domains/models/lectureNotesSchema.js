/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * LectureNotesModel: () : LectureNotesSchema
 * 
 */

const mongoose = require('../../Infrastructure/server/plugins/mongooseCon');
const LectureNotesSchema = require('../schema/lectureNotesSchema');

// Preparatory steps before save to model(pre-save)
LectureNotesSchema.pre('save', function(next) {
    next();
});

export default mongoose.model('LectureNotesModel', LectureNotesSchema);