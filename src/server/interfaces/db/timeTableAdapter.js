/*
 * #k_infinityIII@Echwood
 *
 * timeTableAdapter: ()
 *
 *Functions:
 *  CRUD
 *
 *
 */
import timeTableService from '../../domains/services/timeTableService'
 
const timeTableAdapter = {

    // admin/school
    async createTimetable(schoolName,schoolID,classAlias,timeTableData){
        return timeTableService.createTimetable(schoolName,schoolID,classAlias,timeTableData)
    },
    async removeTimetable(schoolName,schoolID,classAlias,timeTableData){
        return timeTableService.removeTimetable(schoolName,schoolID,classAlias,timeTableData)
    }

    // 

}

export default timeTableAdapter