
/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchoolSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
require('mongoose-type-url')

const TSchema = mongoose.Schema
/**
     * params.Name,
     * params.email,
     * params.password,
     * params.motto,
     * params.Address, 
     * params.Logo,
     * params.Images
 */
const SchoolSchema = new TSchema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    schoolID:{
        type: String,
        required: false,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    motto: {
         type: String,
         required: false,
         unique: true
     },
     Images: [{
        type: TSchema.Types.Url,
        required:false,
      }],
     Logo: {
       type: TSchema.Types.Url,
       required:false,

     },
     private_ACCESS_CODE: {
       type: String,
       required: false,
       unique: true
     },
     public_ACCESS_CODE: {
       type: String,
       required: false,
       unique: true,
       default: ''
     },
     Address: {
       type: String,
       required: false,
       unique: false
     },
     admissionStatus: {
       type: Boolean,
       required: false,
       unique: false,
       default: false
     },
     currentSessionID: {
        type: TSchema.Types.ObjectId,
        ref: 'SchoolSessionModel' 
     },
     activeTerm:{
        type: String,
        required: false,
        default: ''
     },
     paymentInfo: {
        bankName:{
            type: String,
            required: false,
            unique: false
        },
        AccountNumber: {
          type: Number,
          min: 8 ,
          max: 12
        }
     },
     Teachers: [{
        Name:{
            type: String,
            required: false,
            unique: true
        },
        teacherID:{
          type: String,
          required: false,
          unique: true
        },
        teacherRef: {
          type: TSchema.Types.ObjectId,
          ref: 'TeacherModel'
        }
     }],
     subjects: [{
      subjectName:{
          type: String,
          required: false,
          unique: true
      },
      subjectID: {
        type: TSchema.Types.ObjectId,
        ref: 'SubjectHolderModel'
      }
    }],
    activities: [{
     Name:{
         type: String,
         required: false,
         unique: true
     },
     activityID: {
       type: TSchema.Types.ObjectId,
       ref: 'ActivityModel'
     }
   }],
     classList: [{
        className: {
          type: String,
          required: true,
          unique:true
        },
        classAlias: {
          type: String,
          required: false,
          unique:true
        },
        classRef: {
          type: TSchema.Types.ObjectId,
          ref: 'ClassModel'
        }
     }],
     joinedOn: { type: Date, default: new Date() },
     isActive: {
       type: Boolean,
       requried: false,
       default: false
     }

    },
    {
        timestamps: true,
        strict: true
    }

)

export default SchoolSchema