/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchoolSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/server/plugins/mongooseCon';
const paymentInfoSchema = require('./paymentInfoSchema')
const TSchema = mongoose.Schema;

const SchoolSchema = new TSchema(
    {
        'name': {
        type: String,
      required: true,
      unique: true,
    },
     motto: {
         type: String,
         required: false,
         unique: true
     },
     images: [{}],
     logo: {},
     address: {},
     paymentInfo: {
        type: TSchema.Types.ObjectId,
        ref: 'paymentInfoModel'
     },
     
    },
  {strict: true}
);

export default SchoolSchema;