/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * LectureNotesSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/server/plugins/mongooseCon'
const TSchema = mongoose.Schema

const LectureNotesSchema = new TSchema(
    {
        title: {
            type: String,
            unique: true
        },
        notes: {
            type: TSchema.Types.ObjectId,
            
        },

        createdAt: {
            type: Date,
            required: false
        },
        updatedAt: {
            type: Date,
            required: false
        }
    },
    {
        timestamps: true,
        strict: true,
        runSettersOnQuery: true,
    }
)

export default LectureNotesSchema
