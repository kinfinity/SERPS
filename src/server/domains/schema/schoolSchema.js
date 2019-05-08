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
    'Name': {
        type: String,
        required: true,
        unique: true,
    },
    'email': {
        type: String,
        required: true,
        unique: false
    },
    'password': {
        type: String,
        required: true,
        unique: true
    },
    'motto': {
         type: String,
         required: false,
         unique: true
     },
     "Images": [{
        type: TSchema.Types.Url,
        required:false,
      }],
     'Logo': {
       type: TSchema.Types.Url,
       required:false,

     },
     'Address': {
       type: String,
       required: false,
       unique: false
     },
     paymentInfo: {
        type: TSchema.Types.ObjectId,
        ref: 'paymentInfoModel'
     }

    },{strict: true}

);

export default SchoolSchema;