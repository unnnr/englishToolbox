import Cookies from 'js-cookie'
import Http from '@services/Http';

const Auth = new function() {

    function saveToken(token)
    {
        Cookies.set('auth', token, {
            expires:AUTH_TOKEN_EXPIRES 
        });

        Http.defaultHeaders = [{'Authorization': 'Bearer ' + token}];
    }
    
    function removeToken() 
    {
        Cookies.remove('auth');
    }

    function isFormDataEmpty(data)
    {
        if (data.values().next())
            return false;

        return true;
    }

    async function init()
    {
        Http.defaultHeaders = [{'Authorization': 'Bearer ' + Cookies.get('auth')}];

        user = await Http.get('api/profile').catch(() => {});
    
        loaded = true;

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

        saveToken(response.authToken);

        return response;
    }

    this.register = async (data) =>
    {
        let response = await Http.post('register', data); 

        if (!!!response.authToken)
            throw Error('Incorrect http response');

        saveToken(response.authToken);

        return response;
    }

    this.isAdmin = () => {
        if (!!!user)
            return false;
            
        return user.admin;
    },

    this.user = () =>
    {
        if (!!!user)
            return null;

        return { ...user };
    }

    this.edit = async (data) =>
    {
        let name = data.get('name');
        if (name === user.name)
            data.delete('name');

        let email = data.get('email');
        if (email ===  user.email)
            data.delete('email');
        
        let newPassword = data.get('newPassword');
        if (typeof newPassword === 'string' && !!!newPassword.length)
            data.delete('newPassword');

        let confirmation = data.get('confirmation');
        if (typeof confirmation === 'string' && !!!confirmation.length)
            data.delete('confirmation');

        if (isFormDataEmpty(data))
            return;

        let response = await Http.patch('api/profile', data); 

        user.name = response.name;
        user.email = response.email;
        user.verified = response.verified;
        
        return response;
    }

    this.check = () => {
        return Boolean(user);
    }

    this.isVerified = () =>
    {
        if (user)
            return user.verified;

        return false;
    }

    this.getCredentials = () =>
    {
        return  {'Accept': 'Bearer ' + Cookies.get('auth')};
    }
    
    this.onload = (callback) =>
    {
        if (loaded)
        {
            callback();
            return
        }

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

    let loaded = false;
    let user = null; 
    let callbacks = [];

    init();
}();

export default Auth;