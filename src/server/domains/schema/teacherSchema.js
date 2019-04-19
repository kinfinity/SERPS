/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * TeacherSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/server/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const TeacherSchema = new TSchema(
    {
        '': {
        type: TSchema.Types.ObjectId,
        ref: 'floorPlanModel',
      required: true,
      unique: true,
    },
        '': {
        type: TSchema.Types.ObjectId,
        ref: 'waiterModel',
        default: [],
    },
        '': {
        type: TSchema.Types.ObjectId,
        ref: 'mealModel',
        default: [],
    },
    },
  {strict: true}
);

export default TeacherSchema;