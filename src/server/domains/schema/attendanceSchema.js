/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Sat Apr 27 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * attendanceSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const attendanceSchema = new TSchema({
    
    'term': {
        type: Tschema.Types.ObjectId,
        required: true,
        unique: false
    },
    'subject': {
        type: String,
        required: true,
        unique: false
    },
    'dateTime': {
        type: String,
        required: true,
        default: Date.now(),
        unique: false
    },
    'teacher': {
        type: TSchema.Types.ObjectId,
        ref: 'teacherModel',
        required: true
    },
    'class': {
        type: TSchema.Types.ObjectId,
        ref: 'classModel',
        required: true
    },
    'absentStudent': [{
          subject: {
            type: TSchema.Types.ObjectId,
            ref: 'studentModel'    
          }
    }]},

    {strict: true}

);

export default attendanceSchema;