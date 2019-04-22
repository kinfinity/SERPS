/*
 * #k_infinityIII@Echwood
 *
 * profileManagementController: ()
 *
 *Functions:
 *  CRUD
 *
 */


import profileManagementAdapter from '../db/profileManagementAdapter';

const profileManagementController = {

    // teacher
    async getTeacherInfo(teacherName,teacherID){
        return profileManagementAdapter.getTeacherInfo(teacherName,teacherID);
    },
    async updateTeacher(teacherName,teacherID,teacherData){
        return profileManagementAdapter.updateTeacher(teacherName,teacherID,teacherData);
    },
    async createStudentHealthReport(studentID,teacherID,healthData){
        return profileManagementAdapter.createStudentHealthReport(studentID,teacherID,healthData);
    },
    async getStudentHealthReports(studentID,teacherID){
        return profileManagementAdapter.getStudentHealthReports(studentID,teacherID);
    },
    async getStudentHealthReport(reportID,studentID,teacherID){
        return profileManagementAdapter.getStudentHealthReportsLast(reportID,studentID,teacherID);
    },
    async updateStudentHealthReport(studentID,teacherID){
        return profileManagementAdapter.updateStudentHealthReport(studentID,teacherID);
    },
    async removeStudentHealthReport(studentID,teacherID){
        return profileManagementAdapter.removeStudentHealthReport(studentID,teacherID);
    },

    // student
    async getStudentPersonalInfo(studentName,studentID){
        return profileManagementAdapter.getStudentPersonalInfo(studentName,studentID);
    },
    async updateStudentContactInfo(studentName,studentID,contactInfo){
      return profileManagementAdapter.updateStudentContactInfo(studentName,studentID,contactInfo);
    },
    async getStudentAddressInfo(studentName,studentID){
      return profileManagementAdapter.getStudentAddressInfo(studentName,studentID);
    },
    async updateStudentAddressInfo(studentName,studentID,AddressInfo){
      return profileManagementAdapter.updateStudentGuardianInfo(studentName,studentID,AddressInfo);
    },
    async getStudentAcademicInfo(studentName,studentID){
        return profileManagementAdapter.getStudentAcademicInfo(studentName,studentID);
    },
    async getStudentGuardianInfo(studentName,studentID){
        return profileManagementAdapter.getStudentGuardianInfo(studentName,studentID);
    },
    async updateStudentGuardianInfo(studentName,studentID,guardianInfo){
      return profileManagementAdapter.updateStudentGuardianInfo(studentName,studentID,guardianInfo);
    },
    async updateStudent(teacherName,teacherID,teacherData){
        return profileManagementAdapter.updateStudent(teacherName,teacherID,teacherData);
    },
    async getStudentHealthInfo(studentName,studentID){
        return profileManagementAdapter.getStudentHealthInfo(studentName,studentID);
    },
    async updateStudentHealthInfo(studentID){
        return profileManagementAdapter.getStudentHealthReport(studentID);
    },
    async getStudentHealthReports(studentID){
        return profileManagementAdapter.getStudentHealthReports(studentID);
    },

    // parent
    async getParentContactInfo(ParentName,ParentID){
        return profileManagementAdapter.getParentContactInfo(ParentName,ParentID);
    },
    async updateParentContactInfo(contactInfo){
        return profileManagementAdapter.updateParentContactInfo(contactInfo);
    },
    async getParentAddressInfo(ParentName,ParentID){
        return profileManagementAdapter.getParentAddressInfo(ParentName,ParentID);
    },
    async updateParentAddressInfo(addressInfo){
        return profileManagementAdapter.updateParentContactInfo(addressInfo);
    },
    

    // school
    async getSchoolInfo(ParentAlias,SchoolTitle){
        return profileManagementAdapter.getSchoolInfo(ParentAlias,SchoolTitle);
    },
    async updateSchool(ParentAlias,SchoolTitle,SchoolData){
        return profileManagementAdapter.updateSchool(ParentAlias,SchoolTitle,SchoolData);
    }

};

export default profileManagementController;