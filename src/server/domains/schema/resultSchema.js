/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * resultSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const resultSchema = new TSchema({
    
    'studentID': {
        type: String,
        required: false,
        unique: true,
    },
    'subjectGrade': [{
        type: TSchema.Types.ObjectId,
        ref: 'subjectModel',
        required: true    
        },{
        type: String,
        unique:false,
        required: true
        },{        
        type: TSchema.Types.ObjectId,
        ref: 'teacherModel'
    }],

    },
    {
        timestamps: true,
        strict: true
    }

);

export default resultSchema;
