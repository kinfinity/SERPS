/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Wed Apr 17 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * Function:
 * 
 */

import authorisationController from '../../interfaces/controllers/authorisationController'

export default {

    /**
      * Controlls Authorisation to each API route
      * 
      */
    // authorisationController
    async authoriseParent(accessToken){
      return authorisationController.authoriseParent(accessToken)
    },
    async authoriseSchool(accessToken){
        return authorisationController.authoriseSchoolAdmin(accessToken)
    },
    async authoriseTeacher(accessToken){
        return authorisationController.authoriseTeacher(accessToken)
    },
    async authoriseStudent(accessToken){
        return authorisationController.authoriseStudent(accessToken)
    }

}
