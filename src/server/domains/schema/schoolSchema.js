console.log('***./plugins/schoolSchema.js');

/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchoolSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon';
require('mongoose-type-url');

const TSchema = mongoose.Schema;
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
    'name': {
        type: String,
        required: true,
        unique: true,
    },
    'motto': {
         type: String,
         required: false,
         unique: true
     },
     images: [{}],
     logo: {
       type: TSchema.Types.Url,
       required:false,

     },
     address: {
       type: String,
       required: false,
       unique: false
     },
     paymentInfo: {
        type: TSchema.Types.ObjectId,
        ref: 'paymentInfoModel'
     }

    },
  {strict: true}
);

export default SchoolSchema;