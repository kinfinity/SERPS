// enum for teacher roles
//enum for 

const SERPS_STATUS_CODES = {
    REQUEST_OK: 100,
    REQUEST_ERROR: 101,
    REQUEST_PARAM_ERROR: 102,
    INTERNAL_SERVER_ERROR: 103
}

const BANK_LIST = {
    DEFAULT_ACCOUNTNUMBER: '000000000000',
    ACCOUNTNUMBER_LENGTH: 12,
    DEFAULT: '',
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
    BANK_LIST
}