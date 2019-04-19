/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * StudentSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/server/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const StudentSchema = new TSchema(
    {
        fullname: {
            type: String,
            required: false,
            trim: false,
        },username: {
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
                ref: 'parentModel',
                default: [],
            }
        }],
        class: {
            type: TSchema.Types.ObjectId,
            ref: 'classModel'
        },
        School: {
            type: TSchema.Types.ObjectId,
            ref: 'schoolModel'
        },
        bio: {
            type: String,

        },
        admission_status: {
            type: Boolean,
        },


        verificationCode: String,
            verificationCodeExpiration: Number,
        createdAt: {
            type: Date,
            required: false,
        },
        updatedAt: {
            type: Date,
            required: false,
        },
    },
    {
    strict: true,
    runSettersOnQuery: true,
    }
);

export default StudentSchema;