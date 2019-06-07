/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * parentSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
const TSchema = mongoose.Schema

const ParentSchema = new TSchema(
    {
        Name: {
            firstName: {
                type: String,
                required: false,
                trim: false,
            },
            surName: {
                type: String,
                required: false,
                trim: false,
            },
            lastName: {
                type: String,
                required: false,
                trim: false,
            }
        },
        email: {
            type: String,
            required: false,
            trim: true,
            unique: true
        },
        password: {
                type: String,
                required: true,
        },
        gender: {
            type: String,
        required: false,
        },
        joinedOn: { type: Date, default: new Date() },  
        isActive: {
          type: Boolean,
          requried: false,
          default: false
        },
        children:    [{
            'child': {
                type: TSchema.Types.ObjectId,
                ref: 'studentModel'
        }}]
        
    },
  
    {
        timestamps: true,
        strict: true
    }
)

export default ParentSchema