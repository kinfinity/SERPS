/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * PaymentInfoModel: () : PaymentInfoSchema
 * 
 */

const mongoose = require('../../Infrastructure/server/plugins/mongooseCon');
const PaymentInfoSchema = require('../schema/paymentInfoSchema');

// Preparatory steps before save to model(pre-save)
PaymentInfoSchema.pre('save', function(next) {
    next();
});

export default mongoose.model('PaymentInfoModel', PaymentInfoSchema);