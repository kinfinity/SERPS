
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
    noteText: {
        type: String,
        required: true,
        unique: true,
    },
    noteImages: [{
        type: TSchema.Types.Url,
        required:false
    }],
    created_at: { 
        type: Date,
         required: true, 
         default: Date.now()
    },
    udpated_at: { 
        type: Date, 
        required: true, 
        default: Date.now() 
    },
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