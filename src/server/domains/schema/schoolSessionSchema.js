
/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchoolSessionSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
require('mongoose-type-url')

const TSchema = mongoose.Schema

const term = new TSchema({
    'termTitle': { // 1st,2nd,3rd | Harmattan,Rain
        type: String,
        required: true,
        unique: true,
    },
    'notifications':[{
        type: TSchema.Types.ObjectId,
        ref: 'NotificationModel'
    }],
    'startDate':{
        type: String,
        required: false,
        unique: true
    },
    'endDate':{
        type: String,
        required: false,
        unique: true
    }},
    {
        timestamps: true,
        strict: true
})

term.pre('save', function(next) {

    this.updated_at = new Date() 
    if (!this.created_at ) {
        this.created_at = new Date()
    }

    next()

})

const SchoolSessionSchema = new TSchema({
    name: {  // 1st term = 20xx20xx_1
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    academicYear: {  // 20xx20xx
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    'SchoolName': {
        type: String,
        required: true,
        unique: true,
    },
    'schoolID':{
        type: String,
        required: false,
        unique: true
    },
    Terms: [term]

    },
    {
        timestamps: true,
        strict: true
    }

)

export default SchoolSessionSchema