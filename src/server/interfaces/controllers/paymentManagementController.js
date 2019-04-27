/*
 * #k_infinityIII@Echwood
 *
 * paymentManagementController: ()
 *
 *Functions:
 *  CRUD
 *
 */


import teacherAdapter from '../db/teacherAdapter';
import parentAdapter from '../db/parentAdapter';
import schoolAdapter from '../db/schoolAdminAdapter';
//import paymentmanagementController from '../db/paymentManagementController';

const paymentManagementController = {

    async getTeacherPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID){
        return teacherAdapter.getTeacherPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID);
    },
    async updateTeacherPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID,TeacherPaymentInfoData){
        return teacherAdapter.updateTeacherPaymentInfo(TeacherPaymentInfoName,TeacherPaymentInfoID,TeacherPaymentInfoData);
    },
    async viewTeacherPaymentTransactionHistory(TeacherName,TeacherID){// TransactionID month bank[Teacher] accNo Receipt/Amount
        return teacherAdapter.viewTeacherPaymentTransactionHistory(TeacherName,TeacherID); 
    },

    async getSchoolPaymentInfo(SchoolName,SchoolID){
        return schoolAdapter.getSchoolPaymentInfo(SchoolName,SchoolID);
    },
    async updateSchoolPaymentInfo(SchoolName,SchoolID,PaymentInfoData){
        return schoolAdapter.updateSchoolPaymentInfo(SchoolName,SchoolID,PaymentInfoData);
    },
    async viewSchoolPaymentTransactionHistory(SchoolName,SchoolID){// TransactionID month teacher bank[Teacher] accNo Receipt/Amount
        return schoolAdapter.viewSchoolPaymentTransactionHistory(SchoolName,SchoolID); 
    },

    async getParentPaymentInfo(ParentPaymentInfoAlias){
        return parentAdapter.getParentPaymentInfo(ParentPaymentInfoAlias);
    },
    async updateParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData){
        return parentAdapter.updateParentPaymentInfo(ParentPaymentInfoAlias,ParentPaymentInfoData);
    },
    async viewParentPaymentTransactionHistory(ParentName,ParentID){// TransactionID Term bank[parent] accNo Receipt
        return parentAdapter.viewParentPaymentTransactionHistory(ParentName,ParentID);
    },
    async payTuition(ParentName,ParentID,StudentID){
        //return paymentManagementAdapter.payTuition(ParentName,ParentID,StudentID);
    }

};

export default paymentManagementController;