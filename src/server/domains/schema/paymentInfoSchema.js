/*
 * Created by k_infinity3 <ksupro1@gmail.com> 
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * paymentInfochema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
const TSchema = mongoose.Schema

const PaymentInfoSchema = new TSchema(
    {
        'Name': {
            type: String,
            required: true,
            unique: true,
        },
        'schooolID':{
            type: String,
            required: false,
            unique: true
        },
        bankName: {
            type: String,
            required: true
        },
        AccountNumber: {
            type: Number,
            min: 8,
            max: 10
        },
        created_at: { 
            type: Date,
             required: true, 
             default: Date.now()
        },
        udpated_at: { 
            type: Date, 
            required: true, 
            default: Date.now() 
        }
    },
    {
        timestamps: true,
        strict: true
    }
)

export default PaymentInfoSchema