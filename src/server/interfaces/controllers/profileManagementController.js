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
    async getTeacherInfo(teacherName,teacherID){
        return teacherAdapter.getTeacherInfo(teacherName,teacherID)
    },
    async updateTeacher(teacherName,teacherID,teacherData){
        return teacherAdapter.updateTeacher(teacherName,teacherID,teacherData)
    },
    async createStudentHealthReport(studentID,teacherID,healthData){
        return studentAdapter.createStudentHealthReport(studentID,teacherID,healthData)
    },
    async getStudentHealthReports(studentID,teacherID){
        return studentAdapter.getStudentHealthReports(studentID,teacherID)
    },
    async getStudentHealthReport(reportID,studentID,teacherID){
        return studentAdapter.getStudentHealthReportsLast(reportID,studentID,teacherID)
    },
    async updateStudentHealthReport(studentID,teacherID){
        return studentAdapter.updateStudentHealthReport(studentID,teacherID)
    },
    async removeStudentHealthReport(studentID,teacherID){
        return studentAdapter.removeStudentHealthReport(studentID,teacherID)
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
    async getPeresonalInfo(ParentName,ParentID){
        return parentAdapter.getParentContactInfo(ParentName,ParentID)
    },
    async getParentContactInfo(ParentName,ParentID){
        return parentAdapter.getParentContactInfo(ParentName,ParentID)
    },
    async updateParentContactInfo(contactInfo){
        return parentAdapter.updateParentContactInfo(contactInfo)
    },
    async getParentAddressInfo(ParentName,ParentID){
        return parentAdapter.getParentAddressInfo(ParentName,ParentID)
    },
    async updateParentAddressInfo(addressInfo){
        return parentAdapter.updateParentContactInfo(addressInfo)
    },
    

    // school
    async getSchoolInfo(schoolName,schoolID){
        return schoolAdapter.getSchoolInfo(schoolName,schoolID)
    },
    async updateSchool(schoolName,schoolID,SchoolData){
        return schoolAdapter.updateSchool(schoolName,schoolID,SchoolData)
    },
    async getSchoolContactInfo(ParentName,ParentID){
        return schoolAdapter.getSchoolContactInfo(ParentName,ParentID)
    },
    async updateSchoolContactInfo(shoolName,schoolID,contactInfo){
        return schoolAdapter.updateSchoolContactInfo(shoolName,schoolID,contactInfo)
    }

}

export default profileManagementController