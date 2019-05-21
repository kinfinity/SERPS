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
        termID: {
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
        MONDAY: {
            allocation: [{
                subject:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'SubjectModel'
                },
                teacher:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'TeacherModel'
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }]
        },
        TUESDAY: {
            allocation: [{
                subject:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'SubjectModel'
                },
                teacher:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'TeacherModel'
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }]
        },
        WEDNESSDAY: {
            allocation: [{
                subject:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'SubjectModel'
                },
                teacher:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'TeacherModel'
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }]
        },
        THURSDAY: {
            allocation: [{
                subject:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'SubjectModel'
                },
                teacher:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'TeacherModel'
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }]
        },
        FRIDAY: {
            allocation: [{
                subject:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'SubjectModel'
                },
                teacher:{
                    type: TSchema.Types.ObjectId,// subject
                    required: false,
                    ref: 'TeacherModel'
                },
                startTime: {
                    type:  String
                },
                endTime: {
                    type: String
                }
            }]
        },
        
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
