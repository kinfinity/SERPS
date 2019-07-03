/*
 * #k_infinityIII@Echwood
 *
 * timeTableSchema: () : mongooseSchema
 * 
 */

import mongoose from '../../Infrastructure/plugins/mongooseCon'
const TSchema = mongoose.Schema


const timeTableSchema = new TSchema(
  {
        schoolName: {
            type: String,
            required: true
        },
        schoolID: {
            type: String,
            required: true
        },
        sessionID: {
            type: TSchema.Types.ObjectId,
            ref: 'termModel',
            required: true,
            unique: true
        },
        classID: {
            type: TSchema.Types.ObjectId,
            required: true
        },
        noPeriods:{
            type: Number
        },
        MONDAY: [{
                subject:{
                    type: String
                },
                teacher:{
                    type: String
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }],
        TUESDAY: [{
                subject:{
                    type: String
                },
                teacher:{
                    type: String
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }],
        WEDNESSDAY: [{
                subject:{
                    type: String
                },
                teacher:{
                    type: String
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }],
        THURSDAY: [{
                subject:{
                    type: String
                },
                teacher:{
                    type: String
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }],
        FRIDAY: [{
                subject:{
                    type: String
                },
                teacher:{
                    type: String
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }],
        
     created_at: { 
        type: Date,
         required: false, 
         default: Date.now()
    },
    udpated_at: { 
        type: Date, 
        required: true, 
        default: Date.now() 
    }

    },{
    strict: true,
    runSettersOnQuery: true,
    }
)

export default timeTableSchema
