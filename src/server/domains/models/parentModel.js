/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * ParentModel: () : ParentSchema
 * 
 */

const mongoose = require('../../Infrastructure/plugins/mongooseCon')
const ParentSchema = require('../schema/parentSchema')

// Preparatory steps before save to model(pre-save)
ParentSchema.default.pre('save', function (next) {

  const now = new Date()
    this.updated_at = now
    if ( !this.created_at ) {
        this.created_at = now
    }

  next()
  
})

export default mongoose.default.model('ParentModel', ParentSchema.default)