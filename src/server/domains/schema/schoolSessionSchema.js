
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
    calendarID: {
        type:TSchema.Types.ObjectId,
        ref: 'SchoolCalendarModel',
        required: false
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
    firstTerm: {
        'termTitle': {
            type: String,
            required: true,
            unique: true,
            default: "Frist Term"
        },
        'startDate':{
            type: String,
            required: false,
            unique: false
        },
        'endDate':{
            type: String,
            required: false,
            unique: false
        }
    },
    secondTerm: {
        'termTitle': { 
            type: String,
            required: true,
            unique: true,
            default: "Second Term"
        },
        'startDate':{
            type: String,
            required: false,
            unique: false
        },
        'endDate':{
            type: String,
            required: false,
            unique: false
        }
    },
    thirdTerm: {
        'termTitle': {
            type: String,
            required: true,
            unique: true,
            default: "Third Term"
        },
        'startDate':{
            type: String,
            required: false,
            unique: false
        },
        'endDate':{
            type: String,
            required: false,
            unique: false
        }
    },
    notifications: [{
        type: TSchema.Types.ObjectId,
        ref: 'NotificationModel'
    }]},
    {
        timestamps: true,
        strict: true
    }

)

export default SchoolSessionSchema