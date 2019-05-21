/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * TeacherSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
const TSchema = mongoose.Schema

const TeacherSchema = new TSchema(
    {
        Name: {
            first:{
                type: String,
                required: true,
                unique: true
            },
            middle: {
                type: String,
                required: true,
                unique: true
            },
            last: {
                type: String,
                required: true,
                unique: true
            }
        },
        birthDate: {
            type: Date,
            required: false
        },
        joinedOn: { type: Date, default: new Date() },
        courseTimeTables: [{
            classAlias: {
              type: String,
              required: true
            },
            subjectAlias: {
              type: String,
              required: true
            },
            allocation: [{
              Day: {
                type: String,
                required: true
              },
              startTime: {
                type: Date,
                required: true
              },
              endTime: {
                type: Date,
                required: true
              }
            }]
        }],
        isActive: {
          type: Boolean,
          requried: false,
          default: false
        }

    },
  {strict: true}
)

export default TeacherSchema