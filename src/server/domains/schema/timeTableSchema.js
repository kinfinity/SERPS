/*
 * #k_infinityIII@Echwood
 *
 * timeTableSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon';
const TSchema = mongoose.Schema;

const timeTableSchema = new TSchema(
  {
        termID: {
            type: TSchema.Types.ObjectId,
            ref: 'termModel',
            required: true,
            unique: true
        },
        classID: {
            type: TSchema.Types.ObjectId,
            required: true,
        },
        Data: [{
            type: TSchema.Types.ObjectId,// subject
            required: false,
            ref: 'subjectModel'
        },{
            type: TSchema.Types.ObjectId,//teacher
            required: false,
            ref: 'teacherModel'
        },{
            type: Date, // find time object for mongoose - start time
            required: true,
        },{
            type: Date, // - stop time 
            required: true
        }]

    },{
    strict: true,
    runSettersOnQuery: true,
    }
);

export default timeTableSchema;
