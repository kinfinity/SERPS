/*
 * #k_infinityIII@Echwood
 *
 * timeTableController: ()
 *
 *Functions:
 *  CRUD
 *
 *
 */


import timeTableAdapter from '../db/timeTableAdapter'

const timeTableController = {

    getSubjectTimetable(subjectAlias,ClassAlias){
        return timeTableAdapter.getSubjectTimetable(subjectAlias,ClassAlias)
    },
    createTimetable(schoolName,schoolID,classAlias,timeTableData){
        return timeTableAdapter.createTimetable(schoolName,schoolID,classAlias,timeTableData) // list or Datastructure [list of lists]
    },
    getClassTimetable(schoolName,classAlias){
        return timeTableAdapter.getTimetable(schoolName,classAlias)
    },
    updateTimetable(ClassAlias,subject,timeSlot){ // timeSlot Enum for ClassAlias ranges
        return timeTableAdapter.updateTimetable(ClassAlias,subject,timeSlot)
    },
    deleteTimetable(ClassAlias,timeTableID){
        return timeTableAdapter.deleteTimetable(ClassAlias,timeTableID)
    },
    archiveTimetable(ClassAlias,timeTableID){
        return timeTableAdapter.archiveTimetable(ClassAlias,timeTableID)
    }

}

export default timeTableController