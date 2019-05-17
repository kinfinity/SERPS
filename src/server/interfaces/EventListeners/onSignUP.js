/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 * Created on Tues Apr 16 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * SchoolModel: () : SchoolSchema
 * 
 */
import mailer from '../../Infrastructure/plugins/mailer'


// use html parser to load html and preparer welcome message

const schoolWelcome = ""

 const onSignUp = {
    school: async (params) => {
        
        // send Welcome message by email
        // mailer(params.email,schoolWelcome)// ? senders Mail

    },
    teacher: async () => {},
    parent: async () => {},
    student: async () => {}
 }

 export default onSignUp