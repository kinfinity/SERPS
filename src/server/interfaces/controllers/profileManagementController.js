/*
 * #k_infinityIII@Echwood
 *
 * profileManagementController: ()
 *
 *Functions:
 *  CRUD
 *
 */

import teacherAdapter from '../db/teacherAdapter'
import parentAdapter from '../db/parentAdapter'
import schoolAdapter from '../db/schoolAdminAdapter'
import studentAdapter from '../db/studentAdapter'
import winstonLogger from '../../Infrastructure/utils/winstonLogger';

const   profileManagementController = {

    // teacher
    async getTeacherInfo(schoolName,schoolID,teacherName,teacherID){
        return teacherAdapter.getTeacherInfo(schoolName,schoolID,teacherName,teacherID)
    },
    async getTeacherContactInfo(schoolName,schoolID,teacherName,teacherID){
        return teacherAdapter.getTeacherContactInfo(schoolName,schoolID,teacherName,teacherID)
    },
    async updateTeacherContactInfo(schoolName,schoolID,teacherName,teacherID,contactInfo){
        return teacherAdapter.updateTeacherContactInfo(schoolName,schoolID,teacherName,teacherID,contactInfo)
    },
    async updateTeacher(schoolName,schoolID,teacherName,teacherID,teacherData){
        return teacherAdapter.updateTeacher(schoolName,schoolID,teacherName,teacherID,teacherData)
    },
    async createStudentHealthReport(schoolName,schoolID,studentID,teacherID,healthData){
        return studentAdapter.createStudentHealthReport(schoolName,schoolID,studentID,teacherID,healthData)
    },
    async getStudentHealthReports(schoolName,schoolID,studentID,teacherID){
        return studentAdapter.getStudentHealthReports(schoolName,schoolID,studentID,teacherID)
    },
    async getStudentHealthReport(schoolName,schoolID,reportID,studentID,teacherID){
        return studentAdapter.getStudentHealthReportsLast(schoolName,schoolID,reportID,studentID,teacherID)
    },
    async updateStudentHealthReport(schoolName,schoolID,studentID,teacherID){
        return studentAdapter.updateStudentHealthReport(schoolName,schoolID,studentID,teacherID)
    },
    async removeStudentHealthReport(schoolName,schoolID,studentID,teacherID){
        return studentAdapter.removeStudentHealthReport(schoolName,schoolID,studentID,teacherID)
    },

    // student
    async getStudentPersonalInfo(schoolName,fullName,studentID){
        return studentAdapter.getStudentPersonalInfo(schoolName,fullName,studentID)
    },
    async updateStudentContactInfo(schoolName,fullName,studentID,contactInfo){
      return studentAdapter.updateStudentContactInfo(schoolName,fullName,studentID,contactInfo)
    },
    async getStudentAddressInfo(schoolName,schoolID,studentName,studentID){
      return studentAdapter.getStudentAddressInfo(schoolName,schoolID,studentName,studentID)
    },
    async updateStudentAddressInfo(schoolName,schoolID,studentName,studentID,AddressInfo){
      return studentAdapter.updateStudentGuardianInfo(schoolName,schoolID,studentName,studentID,AddressInfo)
    },
    async getStudentAcademicInfo(schoolName,fullName,studentID){
        return studentAdapter.getStudentAcademicInfo(schoolName,fullName,studentID)
    },
    async getGuardianInfo(schoolName,fullName,studentID){
        //get parentID
        const parentID = studentAdapter.getGuardianInfo(schoolName,fullName,studentID)
        winstonLogger.info('PARENT:')
        winstonLogger.info(JSON.stringify(parentID,null,4))
        if(parentID){
            return parentAdapter.getPersonalInfo(parentID.parentRef)
        }else{
            return parentID
        }
    },
    async getStudentHealthInfo(schoolName,schoolID,studentName,studentID){
        return studentAdapter.getStudentHealthInfo(schoolName,schoolID,studentName,studentID)
    },
    async updateStudentHealthInfo(schoolName,schoolID,studentID){
        return studentAdapter.getStudentHealthReport(schoolName,schoolID,studentID)
    },
    async getStudentHealthReports(schoolName,schoolID,studentID){
        return studentAdapter.getStudentHealthReports(schoolName,schoolID,studentID)
    },

    // parent
    async getParentInfo(parentName,parentID){
        return parentAdapter.getParentInfo(parentName,parentID)
    },
    async getParentContactInfo(parentName,parentID){
        return parentAdapter.getParentContactInfo(parentName,parentID)
    },
    async updateParentContactInfo(parentName,parentID,contactInfo){
        return parentAdapter.updateParentContactInfo(parentName,parentID,contactInfo)
    },
    async getChildrenInfo(parentName,parentID){
        return parentAdapter.getChildrenInfo(parentName,parentID)
    },
    

    // school
    async getSchoolInfo(schoolName,schoolID){
        return schoolAdapter.getSchoolInfo(schoolName,schoolID)
    },
    async updateSchool(schoolName,schoolID,SchoolData){
        return schoolAdapter.updateSchool(schoolName,schoolID,SchoolData)
    },
    async getSchoolContactInfo(parentName,parentID){
        return schoolAdapter.getSchoolContactInfo(parentName,parentID)
    },
    async updateSchoolContactInfo(shoolName,schoolID,contactInfo){
        return schoolAdapter.updateSchoolContactInfo(shoolName,schoolID,contactInfo)
    }

}

export default profileManagementController