/*
 * #k_infinityIII@Echwood
 *
 * educationManagementController: ()
 *
 *Functions:
 *  CRUD
 *
 *
 */


import educationManagementAdapter from '../db/educationManagementAdapter';
 
const educationManagementController = {

    async createClass(classAlias,classData){
        return educationManagementAdapter.createClass(classAlias,classData);
    },
    async createSubject(classAlias,subjectData){
        return educationManagementAdapter.createSubject(classAlias,subjectData);
    },

    async update(){
        return educationManagementAdapter.update();
    },
    async update(){
        return educationManagementAdapter.update();
    },    
    async update(){
        return educationManagementAdapter.update();
    },    
    async get(){
        return educationManagementAdapter.get();
    },
    async get(){
        return educationManagementAdapter.get();
    },
    async get(){
        return educationManagementAdapter.get();
    },
    

    async removeClass(classAlias){
        return educationManagementAdapter.removeClass(classAlias);
    },
    async removeSubject(classAlias,sujectTitle){
        return educationManagementAdapter.removeSubject(classAlias,subjectTitle);
    }

};

export default educationManagementController;