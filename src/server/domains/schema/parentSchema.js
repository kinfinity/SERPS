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
        fullName: {
            type: String,
            required: false,
            trim: false,
            unique: true
        },
        parentID: {
            type: String,
            required: false,
            trim: false,
            unique: true
        },
        email: {
            type: String,
            required: false,
            trim: true,
            unique: true
        },
        Address: {
            type: String,
            required: false
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
            'schoolName':{
                type: String,
                requried: false
            },
            'schoolID': {
                type: String,
                requried: false
            },
            'Name': {
                type: String,
                requried: false
            },
            'childRef': {
                type: TSchema.Types.ObjectId,
                ref: 'studentModel'
            }
        }]
        
    },
  
    {
        timestamps: true,
        strict: true
    }
)

export default ParentSchema