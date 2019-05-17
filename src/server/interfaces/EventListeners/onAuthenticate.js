/*
 * Created by k_infinity3 <ksupro1@gmail.com>
 *
 * Copyright (c) 2019 Echwood Inc.
 * 
 *  Upon Authentication Tokens should be watched and added to reddis whitelist
 *  critical for Token authorisation
 *
 */


 const onAuthenticate = {

    /**
     *  Adds Token to whitelist in redis cacheDB
     * 
     */
    redisWhitelist: async (Token) => {
        

    },
    /**
     *  Adds Token to blacklist in redis cacheDB
     * 
     */
    redisBlacklist: async (Token) => {

    }

 }

 export default onAuthenticate