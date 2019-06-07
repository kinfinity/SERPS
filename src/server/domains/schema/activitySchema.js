/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * activitySchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
require('mongoose-type-url')

const TSchema = mongoose.Schema

const activityNote = TSchema({
    Title: {
        type: String,
        require:true,
        unique: false
    },
    Text:{
        type: String,
        require: false,
        unique: false
    },
    Images: [{
        type: TSchema.Types.Url,
        required: false
    }]},
    {
    timestamps: true,
    strict: true
})

activityNote.pre('save', function(next) {

    this.updated_at = new Date() 
    if (!this.created_at ) {
        this.created_at = new Date()
    }

    next()

})

const activitySchema = new TSchema({
    
    schoolName: {
        type: String,
        required: true,
        unique: true,
    },
    schoolID:{
        type: String,
        required: false,
        unique: true
    },
    activityNotes:[activityNote],
    created_at: { 
        type: Date,
         required: false, 
         default: Date.now()
    },
    udpated_at: { 
        type: Date, 
        required: true, 
        default: Date.now() 
    },
    teachers: [{
        type: TSchema.Types.ObjectId,
        ref: 'TeacherModel'
    }],
    students: [{
        type: TSchema.Types.ObjectId,
        ref: 'StudentModel'
    }]},

    {
        timestamps: true,
        strict: true
    }

)

export default activitySchema