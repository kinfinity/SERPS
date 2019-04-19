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

    // teachher
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
    async getStudenAcademictInfo(studentName,studentID){
        return profileManagementAdapter.getStudentAcademicInfo(studentName,studentID);
    },
    async getStudentHealthInfo(studentName,studentID){
        return profileManagementAdapter.getStudentHealthInfo(studentName,studentID);
    },
    async getStudentGuardianInfo(studentName,studentID){
        return profileManagementAdapter.getStudentGuardianInfo(studentName,studentID);
    },
    async updateStudent(teacherName,teacherID,teacherData){
        return profileManagementAdapter.updateStudent(teacherName,teacherID,teacherData);
    },
    async getStudentHealthReport(studentID){
        return profileManagementAdapter.getStudentHealthReport(studentID);
    },

    // parent
    async getParentInfo(ParentAlias){
        return profileManagementAdapter.getParentInfo(ParentAlias);
    },
    async updateParent(ParentAlias,ParentData){
        return profileManagementAdapter.updateParent(ParentAlias,ParentData);
    },
    async getStudentHealthReport(studentID,parentID){
        return profileManagementAdapter.getStudentHealthReport(studentID,parentID);
    },

    async getSchoolInfo(ParentAlias,SchoolTitle){
        return profileManagementAdapter.getSchoolInfo(ParentAlias,SchoolTitle);
    },
    async updateSchool(ParentAlias,SchoolTitle,SchoolData){
        return profileManagementAdapter.updateSchool(ParentAlias,SchoolTitle,SchoolData);
    }

};

export default profileManagementController;