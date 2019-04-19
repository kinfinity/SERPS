/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SubjectSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/server/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const SubjectSchema = new TSchema(
    {
        'title': {
        type: String,
      required: true,
      unique: true,
    },
    lectureNotes: {
        type: TSchema.Types.ObjectId,
        ref: 'lectureNotesModel'
    },
     
    },
  {strict: true}
);

export default SubjectSchema;