/*
 * #k_infinityIII@Echwood
 *
 * profileManagementController: ()
 *
 *Functions:
 *  CRUD
 *
 */

import teacherAdapter from '../db/teacherAdapter';
import parentAdapter from '../db/parentAdapter';
import schoolAdapter from '../db/schoolAdminAdapter';
import studentAdapter from '../db/studentAdapter';

const   profileManagementController = {

    // teacher
    async getTeacherInfo(teacherName,teacherID){
        return teacherAdapter.getTeacherInfo(teacherName,teacherID);
    },
    async updateTeacher(teacherName,teacherID,teacherData){
        return teacherAdapter.updateTeacher(teacherName,teacherID,teacherData);
    },
    async createStudentHealthReport(studentID,teacherID,healthData){
        return studentAdapter.createStudentHealthReport(studentID,teacherID,healthData);
    },
    async getStudentHealthReports(studentID,teacherID){
        return studentAdapter.getStudentHealthReports(studentID,teacherID);
    },
    async getStudentHealthReport(reportID,studentID,teacherID){
        return studentAdapter.getStudentHealthReportsLast(reportID,studentID,teacherID);
    },
    async updateStudentHealthReport(studentID,teacherID){
        return studentAdapter.updateStudentHealthReport(studentID,teacherID);
    },
    async removeStudentHealthReport(studentID,teacherID){
        return studentAdapter.removeStudentHealthReport(studentID,teacherID);
    },

    // student
    async getStudentPersonalInfo(studentName,studentID){
        return studentAdapter.getStudentPersonalInfo(studentName,studentID);
    },
    async updateStudentContactInfo(studentName,studentID,contactInfo){
      return studentAdapter.updateStudentContactInfo(studentName,studentID,contactInfo);
    },
    async getStudentAddressInfo(studentName,studentID){
      return studentAdapter.getStudentAddressInfo(studentName,studentID);
    },
    async updateStudentAddressInfo(studentName,studentID,AddressInfo){
      return studentAdapter.updateStudentGuardianInfo(studentName,studentID,AddressInfo);
    },
    async getStudentAcademicInfo(studentName,studentID){
        return studentAdapter.getStudentAcademicInfo(studentName,studentID);
    },
    async getStudentGuardianInfo(studentName,studentID){
        //get parentID
        const parentID = studentAdapter.getGuardianInfo(studentName,studentID);
        return parentAdapter.getPersonalInfo(parentID);
    },
    async updateStudentGuardianInfo(studentName,studentID,guardianInfo){
      return studentAdapter.updateStudentGuardianInfo(studentName,studentID,guardianInfo);
    },
    async getStudentHealthInfo(studentName,studentID){
        return studentAdapter.getStudentHealthInfo(studentName,studentID);
    },
    async updateStudentHealthInfo(studentID){
        return studentAdapter.getStudentHealthReport(studentID);
    },
    async getStudentHealthReports(studentID){
        return studentAdapter.getStudentHealthReports(studentID);
    },

    // parent
    async getPeresonalInfo(ParentName,ParentID){
        return parentAdapter.getParentContactInfo(ParentName,ParentID);
    },
    async getParentContactInfo(ParentName,ParentID){
        return parentAdapter.getParentContactInfo(ParentName,ParentID);
    },
    async updateParentContactInfo(contactInfo){
        return parentAdapter.updateParentContactInfo(contactInfo);
    },
    async getParentAddressInfo(ParentName,ParentID){
        return parentAdapter.getParentAddressInfo(ParentName,ParentID);
    },
    async updateParentAddressInfo(addressInfo){
        return parentAdapter.updateParentContactInfo(addressInfo);
    },
    

    // school
    async getSchoolInfo(schoolName,schoolID){
        return schoolAdapter.getSchoolInfo(schoolName,schoolID);
    },
    async updateSchool(schoolName,schoolID,SchoolData){
        return schoolAdapter.updateSchool(schoolName,schoolID,SchoolData);
    }

};

export default profileManagementController;