/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SubjectSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/server/plugins/mongooseCon'
const TSchema = mongoose.Schema

const classSubject = TSchema({  

    classID: {
      type: TSchema.Types.ObjectId,
      required: true
    },
    teacher: {
      type: TSchema.Types.ObjectId,
      required:true
    },
    lectureNotes: [{
      type: TSchema.Types.ObjectId,
      ref: 'lectureNotesModel'
    }]},
    {
      timestamps: true,
      strict: true
})

const SubjectSchema = new TSchema(
    {
      'SchoolName': {
        type: String,
        required: true,
        unique: true,
      },
      'schoolID':{
          type: String,
          required: false,
          unique: true
      },
      title: { // e.g BIOLOGY
          type: String,
          required: true,
          unique: true,
      },
      classSubjects: [classSubject]
      
    },
    {
      timestamps: true,
      strict: true
  }
)

export default SubjectSchema