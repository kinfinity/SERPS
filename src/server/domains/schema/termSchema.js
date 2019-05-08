/*
 * #k_infinityIII@Echwood
 *
 * termSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const termSchema = new TSchema(
  {
        name: {  // 1st term = 20xx20xx_1
            type: String,
            required: false,
            trim: true,
            unique: true
        },
        academicYear: {  // 20xx20xx
            type: String,
            required: false,
            trim: true,
            unique: true
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        }

    },{
    strict: true,
    runSettersOnQuery: true,
    }
);

export default termSchema;
