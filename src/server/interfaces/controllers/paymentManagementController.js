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

    async getSchoolPaymentInfo(SchoolName,SchoolID){
        return paymentManagementAdapter.getSchoolPaymentInfo(SchoolName,SchoolID);
    },
    async updateSchoolPaymentInfo(SchoolName,SchoolID,PaymentInfoData){
        return paymentManagementAdapter.updateSchoolPaymentInfo(SchoolName,SchoolID,PaymentInfoData);
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
    },
    async payTuition(ParentName,ParentID,StudentID){
        return paymentManagementAdapter.payTuition(ParentName,ParentID,StudentID);
    }

};

export default paymentManagementController;