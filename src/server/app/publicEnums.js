// enum for teacher roles
//enum for 

const SERPS_STATUS_CODES = {
    REQUEST_OK: 100,
    REQUEST_ERROR: 101,
    SIGNUP_ERROR_USEREXISTS: 1011,
    LOGIN_ERROR: 1111,
    REQUEST_ERROR_FAILEDTOCREATE: 1012,
    REQUEST_ERROR_SCHOOLCODEMISMATCH: 1013,
    REQUEST_PARAM_ERROR: 102,
    NO_TOKEN: 1000,
    INCORRECT_TOKEN: 2222,
    INTERNAL_SERVER_ERROR: 103
}
const SERPS_STATUS_MESSAGES = {
    REQUEST_OK: "Smooth sailing",
    ASSERTION_ERR: "code Assertion Error, Check Logs",
    INTERNAL_SERVER_ERROR: "Error while processing request",
    CSRF_ERROR: "CSRF TOKEN tampered with",
    HASHING_ERROR: "Error while hashing password",
    INCORRECT_PARAMS: "incorrect parameters",
    INCORRECT_USERNAME: "username does not exist",
    SIGNUP_ERROR_USEREXISTS: "username already exists",
    SIGNUP_ERROR_EMAILEXISTS: "Email already signed up",
    INCORRECT_PASSWORD: "incorrect password",
    SUCCESSFUL_LOGIN: "Login: SUCCESS!",
    INCORRECT_TOKEN: "incorrect Token",
    EMPTY_TOKEN: "No Token present in header",
    EXPIRED_TOKEN: "Token Expired",
    REVOKED_TOKEN: "Revoked Token : Logged out",
    WRONG_ACCESS: "Aren't permitted to hit this endpoint",
    MAX_LOGINS_EXCEEDED: "maximum amount of Logins exceeded"

}

const CLASS_LIST = {
    JUNIORSECONDARY1: 'JS1',
    JUNIORSECONDARY2: 'JS2',
    JUNIORSECONDARY3: 'JS3',
    SEIONRSECONDARY1: 'SS1',
    SEIONRSECONDARY2: 'SS2',
    SEIONRSECONDARY3: 'SS3',
    JUNIORSECONDARY1x: 'JS1x',
    JUNIORSECONDARY2x: 'JS2x',
    JUNIORSECONDARY3x: 'JS3x',
    SEIONRSECONDARY1x: 'SS1x',
    SEIONRSECONDARY2x: 'SS2x',
    SEIONRSECONDARY3x: 'SS3x',
    match: (ClassName) => {
        
        // deserialize json array to object array
        const class_list = JSON.parse(CLASS_LIST)

        for(let i = 0; i < class_list.length ; i++){

            if(class_list[i].toString() === ClassName.toString()){

                    return true
        
            }
            //move to next member in object_array
        }
        // If it doesn't exist within the list
        return false

    }
}

const BANK_LIST = {
    DEFAULT_ACCOUNTNUMBER: '000000000000',
    ACCOUNTNUMBER_LENGTH: 12,
    DEFAULT: 'DEFAULT',
    UBA: 'UBA',
    GTB: 'ZENITH',
    exists: (BankName) => {
        
        // deserialize json array to object array
        const bank_list = JSON.parse(BANK_LIST)

        for(let i = 0; i < bank_list.length ; i++){

            if(bank_list[i].toString() === BankName.toString()){

                    return true
        
            }
            //move to next member in object_array
        }
        // If it doesn't exist within the list
        return false

    }
}


export default {
    SERPS_STATUS_CODES,
    SERPS_STATUS_MESSAGES,
    BANK_LIST,
    CLASS_LIST
}