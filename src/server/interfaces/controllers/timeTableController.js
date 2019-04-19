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


import timeTableAdapter from '../db/timeTableAdapter';

const timeTableController = {

    getClassTimetable(Class){
        return timeTableAdapter.getClassTimetable(Class);
    },
    getSubjectTimetable(subjectAlias,Class){
        return timeTableAdapter.getSubjectTimetable(subjectAlias,Class);
    },
    createTimetable(timeTableData){
        return timeTableAdapter.createTimetable(timeTableData); // list or Datastructure [list of lists]
    },
    updateTimetable(Class,subject,timeSlot){ // timeSlot Enum for class ranges
        return timeTableAdapter.updateTimetable(Class,subject,timeSlot);
    },
    deleteTimetable(Class,timeTableID){
        return timeTableAdapter.deleteTimetable(Class,timeTableID);
    },
    archiveTimetable(Class,timeTableID){
        return timeTableAdapter.archiveTimetable(Class,timeTableID);
    }

};

export default timeTableController;