/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 15 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * email validation 
 * 
 */
export default {
    validateEmail(email) {

    const re = '/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/';

    return email.match(re);

  },

};