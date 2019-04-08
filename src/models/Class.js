/*
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Mon Apr 08 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 */
import { Schema, model } from 'mongoose'

var Class = new Schema({
    name: Schema.Types.String,
    alias: Schema.Types.String
})

export default model('Class', Class)
