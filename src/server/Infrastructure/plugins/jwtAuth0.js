/*
 * #k_infinityIII@Echwood
 *
 *ARRMS_SERVER
 *
 *      JWT(tokens)-AUTH0
 *
 */

import auth0 from 'auth0';
import config from '../utils/config';


const webAuth = new auth0.WebAuth({
    domain: config.auth0Domain,
    clientID: config.auth0client,
    redirectUri: AUTH0_CALLBACK_URL,
    responseType: 'token id_token',
    scope: 'openid',
    leeway: 60,
});

export default webAuth;