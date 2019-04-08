/*
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Mon Apr 08 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 */
import { Schema, model } from 'mongoose'

var School = new Schema({
    name: Schema.Types.String,
    address: Schema.Types.String,
    logo: Schema.Types.String,
    images: Schema.Types.Array,
    motto: Schema.Types.String,
    url: Schema.Types.String
})

export default model('School', School)
