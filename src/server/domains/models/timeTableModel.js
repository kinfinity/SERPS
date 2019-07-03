
/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * TimeTableModel: () : TimeTableSchema
 * 
 */

const mongoose = require('../../Infrastructure/plugins/mongooseCon')
const TimeTableSchema = require('../schema/timeTableSchema')

// Preparatory steps before save to model(pre-save)
TimeTableSchema.default.pre('save', function(next) {

    this.updated_at = new Date() 
    if (!this.created_at ) {
        this.created_at = new Date()
    }

    next()

})

export default mongoose.default.model('TimeTableModel', TimeTableSchema.default)