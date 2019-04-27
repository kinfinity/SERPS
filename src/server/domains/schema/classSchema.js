/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * classSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const ClassSchema = new TSchema({
    
    'name': {
        type: String,
        required: false,
        unique: true,
    },
    'alias': {
        type: String,
        required: true,
        unique: true
    },
    'subjects': [{
        type: TSchema.Types.ObjectId,
        ref: 'subjectModel'    
    }],
    'teachers': [{
        type: TSchema.Types.ObjectId,
        ref: 'teacherModel'
    }],
    'students': [{
        type: TSchema.Types.ObjectId,
        ref: 'studentModel'
    }]},

    {strict: true}

);

export default ClassSchema;