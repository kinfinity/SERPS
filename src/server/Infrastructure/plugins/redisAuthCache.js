/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 * 
 *
 */


const redisAuthCache = {

    /**
     *  whitelist manipulation in redis cacheDB
     * 
     */
    Whitelist: {

        AddToken: async (Token) =>{},
        verify: async (Label) => {},
        Remove: async (Token) =>{},

    },
    /**
     *   blacklist manipulation in redis cacheDB
     * 
     */
    Blacklist: {

        AddToken: async (Token) =>{},
        verify: async (Label) => {},
        Remove: async (Token) =>{},

    },
    /**
     * 
     */
    a: {

        a: async(a) => {},
        a: async(a) => {}

    }

 }

 export default redisAuthCache