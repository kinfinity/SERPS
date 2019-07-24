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
                unique: true
            },
            middle: {
                type: String,
                unique: true
            },
            last: {
                type: String,
                unique: true
            }
        },
        fullName:{
          type: String,
          required: true,
          unique: true
        },
        email:{
          type: String,
          required: true,
          unique: true
        },
        password:{
          type: String,
          required: true,
          unique: true
        },
        Address:{
          type: String,
          required: true,
          unique: true
        },
        schoolName:{
          type: String,
          required: true,
          unique: true
        },
        schoolID:{
          type: String,
          required: true,
          unique: true
        },
        teacherID:{
          type: String,
          required: true,
          unique: true
        },
        birthDate: {
            type: Date,
            required: false
        },
        gender: {
          type: String,
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
        class: {
          Alias: {
            type: String,
            required: false,
            unique: false
          },
          classRef: {
            type: String,
            required: false,
            unique: false
          }
        },
        activity: {
          Name: {
            type: String,
            required: false,
            unique: false
          },
          activityRef: {
            type: String,
            required: false,
            unique: false
          }
        },
        subjects: [{
          Name: {
            type: String,
            required: false,
            unique: false
          },
          subjectRef: {
            type: String,
            required: false,
            unique: false
          }
        }],
        teacherIndex:{
          type: Number,
          required: false,
          unique: true
        },
        isActive: {
          type: Boolean,
          requried: false,
          default: false
        }

    },
  {strict: true}
)

export default TeacherSchema