
/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * 
 * Copyright (c) 2019 Echwood Inc.
 *
 * NotificationSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
require('mongoose-type-url')

const TSchema = mongoose.Schema
/**
     * params
 */
const NotificationSchema = new TSchema({
    noteTitle: {
        type: String,
        required: true,
        unique: false,
    },
    SchoolName: {
        type: String,
        required: true,
        unique: false,
    },
    schoolID: { 
        type: String,
        required: true,
        unique: false,
    },
    noteID: {
        type: String,
        required: true,
        unique: true
    },
    noteText: {
        type: String,
        required: true,
        unique: true,
    },
    noteImages: [{
        type: TSchema.Types.Url,
        required:false
    }],
    meta: {
        nViews: {
            type: Number
        }
    }

    },
    
    {
        timestamps: true,
        strict: true
    }

)

export default NotificationSchema