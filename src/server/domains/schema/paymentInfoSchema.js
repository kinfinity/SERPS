/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * paymentInfochema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/server/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const paymentInfoSchema = new TSchema(
    {
        bankName: {
            type: String,
            required: true
        },
        AccountNumber: {
            type: Number,
            min: 8,
            max: 10
        }
    },
  {strict: true}
);

export default paymentInfoSchema;