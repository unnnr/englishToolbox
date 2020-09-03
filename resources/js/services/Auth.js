import Cookies from 'js-cookie'
import Http from '@services/Http';

const Auth = new function() {

    function saveToken(token)
    {
        Cookies.set('auth', token, {
            expires:AUTH_TOKEN_EXPIRES 
        });
    }
    
    function removeToken() 
    {
        Cookies.remove('auth');
    }

    async function init()
    {
        user = await Http.get('user');
    
        for (const callback of callbacks)
            callback();
    }

    this.login = async (data) => 
    {
        let response = await Http.post('login', data)
            .catch(error => {
                removeToken();
                throw error;
            });

        if (!!!response.authToken)
            throw Error('Incorrect http response');

        saveToken(response.token);

        return response;
    }

    this.register = async (data) =>
    {
        let response = await Http.post('register', data); 

        if (!!!response.authToken)
            throw Error('Incorrect http response');

        saveToken(response.token);

        return response;
    }

    this.isAdmin = () => {
        return user.admin;
    },

    this.user = () =>
    {
        if (!!!user)
            return null;

        return { ...user };
    }

    this.isVerified = () =>
    {
        if (user)
            return user.verified;

        return false;
    }

    this.getCredentials = () =>
    {
        return  ['Accept', 'Berier ' + Cookies.get('auth')];
    }
    
    this.onload = (callback) =>
    {
        callbacks.push(callback);
    }

    this.rules = () =>
    {
        return {
            password: {
                max: 64,
                min: 5
            },

            name: {
                max: 32, 
                min: 3
            }
        }
    }

    const AUTH_TOKEN_EXPIRES = 12;

    let user = null; 
    let callbacks = [];

    init();
}();

export default Auth;