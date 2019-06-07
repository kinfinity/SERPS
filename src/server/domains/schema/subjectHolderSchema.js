/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SubjectSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
const TSchema = mongoose.Schema



const SubjectHolderSchema = new TSchema(
    {
      schoolName: {
        type: String,
        required: true,
        unique: true,
      },
      schoolID:{
          type: String,
          required: false,
          unique: true
      },
      title: {
          type: String,
          required: true,
          unique: true,
      },
      Description:{
          type: String,
          required: false,
          unique: true
      },
      JS1: {
        type: TSchema.Types.ObjectId,
        ref: 'SubjectModel',
        unique: true
      },
      JS2: {
        type: TSchema.Types.ObjectId,
        ref: 'SubjectModel',
        unique: true
      },
      JS3: {
        type: TSchema.Types.ObjectId,
        ref: 'SubjectModel',
        unique: true
      },
      SS1: {
        type: TSchema.Types.ObjectId,
        ref: 'SubjectModel',
        unique: true
      },
      SS2: {
        type: TSchema.Types.ObjectId,
        ref: 'SubjectModel',
        unique: true
      },
      SS3: {
        type: TSchema.Types.ObjectId,
        ref: 'SubjectModel',
        unique: true
      }
    },
    {
      timestamps: true,
      strict: true
    }
)

export default SubjectHolderSchema