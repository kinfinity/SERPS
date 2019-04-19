/*
 * #k_infinityIII@Echwood
 *
 * paymentManagementController: ()
 *
 *Functions:
 *  CRUD
 *
 */


import paymentManagementAdapter from '../db/paymentManagementAdapter';

const paymentManagementController = {

    async createTeacherPaymentInfo(TeacherPaymentInfoData){
        return paymentManagementAdapter.createTeacherPaymentInfo(TeacherPaymentInfoData);
    },
    async getTeacherPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID){
        return paymentManagementAdapter.getTeacherPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID);
    },
    async updateTeacherPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID,TeacherPaymentInfoData){
        return paymentManagementAdapter.updateTeacherPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID,TeacherPaymentInfoData);
    },
    async viewTeacherPaymentTransactionHistory(TeacherName,TeacherID){// TransactionID month bank[Teacher] accNo Receipt/Amount
        return paymentManagementAdapter.viewTeacherPaymentTransactionHistory(TeacherName,TeacherID); 
    },

    async createSchoolPaymentInfo(SchoolPaymentInfoData){
        return paymentManagementAdapter.createSchoolPaymentInfo(SchoolPaymentInfoData);
    },
    async getSchoolPaymentInfo(SchoolPaymentInfoName,SchoolPaymentInfoID){
        return paymentManagementAdapter.getSchoolPaymentInfo(SchoolPaymentInfoName,SchoolPaymentInfoID);
    },
    async updateSchoolPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID,TeacherPaymentInfoData){
        return paymentManagementAdapter.updateSchoolPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID,TeacherPaymentInfoData);
    },
    async viewSchoolPaymentTransactionHistory(SchoolName,SchoolID){// TransactionID month teacher bank[Teacher] accNo Receipt/Amount
        return paymentManagementAdapter.viewSchoolPaymentTransactionHistory(SchoolName,SchoolID); 
    },
    
    async createParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData){
        return paymentManagementAdapter.createParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData);
    },
    async getParentPaymentInfo(ParentPaymentInfoAlias){
        return paymentManagementAdapter.getParentPaymentInfo(ParentPaymentInfoAlias);
    },
    async updateParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData){
        return paymentManagementAdapter.updateParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData);
    },
    async viewParentPaymentTransactionHistory(ParentName,ParentID){// TransactionID Term bank[parent] accNo Receipt
        return paymentManagementAdapter.viewParentPaymentTransactionHistory(ParentName,ParentID);
    }

};

export default paymentManagementController;