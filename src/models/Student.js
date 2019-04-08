/*
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Mon Apr 08 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 */
import { Schema, model } from 'mongoose'

var Student = new Schema({
    name: Schema.Types.String
})

export default model('Student', Student)
