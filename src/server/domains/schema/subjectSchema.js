/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SubjectSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
const TSchema = mongoose.Schema

const SubjectSchema = TSchema({  
    schoolName:{
      type: String,
      required: false,
      unique: false
    },
    schoolID: {
      tpe: String,
      required: false,
      unique: false
    },
    subjectName: {
      type: String,
      required:true,
      unique: false
    },
    classAlias: {
      type: String,
      required: true
    },
    teacher: {
      type: TSchema.Types.ObjectId,
      required:false
    },
    lectureNotes: [{
      type: TSchema.Types.ObjectId,
      ref: 'lectureNotesModel'
    }]},
    {
      timestamps: true,
      strict: true
})

export default SubjectSchema