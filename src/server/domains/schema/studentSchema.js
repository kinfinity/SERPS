/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * StudentSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
const TSchema = mongoose.Schema

const StudentSchema = new TSchema(
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
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
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
        birthdate: {
            type: Date,
            required: false,
        },
        parents: [{
            parent: {
                type: TSchema.Types.ObjectId,
                ref: 'ParentModel'
            }
        }],
        activity: {
            type: TSchema.Types.ObjectId,
            ref: 'ActivityModel'
        },
        class: {
            type: TSchema.Types.ObjectId,
            ref: 'ClassModel'
        },
        School: {
            type: TSchema.Types.ObjectId,
            ref: 'SchoolModel'
        },
        bioData: {
            type: TSchema.Types.ObjectId,
            ref: 'BioDataModel'
        },
        admission_status: {
            type: Boolean
        },
        verificationCode:{
            type: String,
            verificationCodeExpiration: {
                type:  Number,
                default: 15
            }
        },
        joinedOn: { type: Date, default: new Date() },
        isActive: {
          type: Boolean,
          requried: false,
          default: false
        }
    },
    {
        timestamps: true,
        strict: true,
        runSettersOnQuery: true,
    }
)

export default StudentSchema