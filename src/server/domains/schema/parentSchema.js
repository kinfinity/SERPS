/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * parentSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/server/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const ParentSchema = new TSchema(
    {
        fullname: {
            type: String,
            required: false,
            trim: false,
        },username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
            email: {
        type: String,
            required: false,
            trim: true,
            unique: true
        },
        password: {
                type: String,
                required: true,
            },
            gender: {
            type: String,
        required: false,
        },  
        children:    [{
            'child': {
                type: TSchema.Types.ObjectId,
                ref: 'studentModel'
        }
    }],
    },
  {strict: true}
);

export default ParentSchema;