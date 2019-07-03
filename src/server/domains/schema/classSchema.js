/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * classSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
const TSchema = mongoose.Schema

const ClassSchema = new TSchema({
    
    name: {
        type: String,
        required: false,
        unique: false
    },
    alias: {
        type: String,
        required: true,
        unique: true
    },
    schoolName:{
        type: String,
        required: true
    },
    schoolID: {
        type: String,
        required: true
    },
    subjects: [{
        Name: {
            type: String,
            required: true,
            unique: true
        },
        Ref: {
            type: TSchema.Types.ObjectId,
            ref: 'SubjectModel'
        }
    }],
    timeTableID: {
        type: TSchema.Types.ObjectId,
        ref: 'TimeTableModel'
    },
    public_HASHED_CODE: { 
        type: String,
        required: false
    },
    teacher: {
      Name: {
          type: String,
          required: false
      },
      teacherRef: {
        type: TSchema.Types.ObjectId,
        ref: 'TeacherModel'
      }
    },
    students: [{
        Name: {
            type: String,
            required: false
        },
        studentRef: {
            type: TSchema.Types.ObjectId,
            ref: 'StudentModel'
        }
    }]

    },

    {
        timestamps: true,
        strict: true    
    }

)

export default ClassSchema