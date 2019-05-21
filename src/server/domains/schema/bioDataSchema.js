/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Sat Apr 27 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * bioDataSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
const TSchema = mongoose.Schema

const bioDataSchema = new TSchema({
    
        student: {
            type: Tschema.Types.ObjectId,
            required: true,
            unique: false
        },
        height: {
            type: Number,
            required: false
        },
        weight: {
            type: Number,
            required: false
        },
        bloodGroup: {
            type: String,
            required: false
        },
        genotype: {
            type: String,
            required: false
        },
        allergies: [{
            condition: {
                type: String,
                required: false
            },
            cure: {
                type: String,
                required: false
            }
        }],
        medicalConditions: [{
            condition: {
                type: String,
                required: false
            },
            cure: {
                type: String,
                required: false
            }
        }]

    },
    {
        timestamps: true,
        strict: true
    }

)

export default bioDataSchema