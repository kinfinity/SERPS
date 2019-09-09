/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 */


const redisAuthCache = {

    /**
     *  whitelist manipulation in redis cacheDB
     *  holds Token references for multiple logins
     *  user | device | [location?]
     * 
     */
    Whitelist: {

        /**
         * Add Token reference of logged in users
         */
        AddToken: async (Token) =>{},
        /**
         * verify if Token is logged in
         */
        verify: async (Label) => {},
        /**
         * logging out or blocking user -> remove from whitelist
         */
        Remove: async (Token) =>{},

    },
    /**
     *   blacklist manipulation in redis cacheDB
     *   holds Token references for tokens Logged out but which haven't expired
     *  the expiry time should be checked to remove the token from this list to avoid memory spillage
     */
    Blacklist: {
        /**
         * Add Token reference of logged in users
         */
        AddToken: async (Token) =>{},
        /**
         * Verify if token is in blacklist
         */
        verify: async (Label) => {},
        /**
         * remove from blacaklist.
         */
        Remove: async (Token) =>{},

    }

 }

 export default redisAuthCache