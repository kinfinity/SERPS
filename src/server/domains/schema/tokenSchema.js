/*
 * #k_infinityIII@Echwood
 *
 * userTokenSchema: () : mongooseSchema
 *  defines structure of userToken Object
 *
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const tokenSchema = new TSchema(
  {
        identifier: {
            type: String,
            required: false,
            trim: true,
            unique: true
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: false,
        },
        expireAt: {
            type: Date,
            required: false,
        },
    },
    {
    strict: true,
    runSettersOnQuery: true,
    }
);

export default tokenSchema;