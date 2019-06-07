
/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchoolCalendarSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
require('mongoose-type-url')

const TSchema = mongoose.Schema

const CalendarEvent = new TSchema({
    EventID: {
        type: String,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        required: true,
        unique: false
    },
    eventDate: {
        type: Date,
        required: true,
        unique: false
    },
    Image: {
        type: TSchema.Types.Url,
        required: false
    },
    Text: {
        type: String,
        required: false
    }

})

const SchoolCalendarSchema = new TSchema({
    schoolName: {
        type: String,
        required: true,
        unique: true
    },
    schoolID:{
        type: String,
        required: false,
        unique: true
    },
     Events: [CalendarEvent]

    },
    {
        timestamps: true,
        strict: true
    }

)

export default SchoolCalendarSchema