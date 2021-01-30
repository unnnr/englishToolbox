import Cookies from 'js-cookie'
import Http from '@services/Http'
import User from '@models/User';

const AUTH_TOKEN_EXPIRES = 666;

class Auth 
{
    __callbacks = [];
    
    user = User;

    constructor() 
    {
        Object.assign(Http.defaultHeaders, this.__creationails());

        this.__wrappUser();
    }

    __wrappUser() 
    {
        function dispatchIfChanged(response)
        {
            if (response !== null)
            {
                previousResponseNotNull = true;
                return;
            }
            
            if (previousResponseNotNull)
            {
                previousResponseNotNull = false;

                __this.__changed(false);
                __this.__removeToken();
            }
        }

        let target = this.user;
        let previousResponseNotNull = false;
        let __this = this;

        this.user = {
            get: async (...args) =>
            {
                let user = await target.get(...args);

                dispatchIfChanged(user);

                return user;
            },

            delete: async (...args) => {
                let user = await target.delete(...args);

                this.__removeToken();
                dispatchIfChanged(null);

                return user;
            },

            edit: async (...args)=> 
            {
                let response = await target.edit(...args);

                dispatchIfChanged(response);
                
                if (response === null)  
                    return;
                    
                // Handling token
                this.__saveToken(response.auth);
                delete response.auth;

                return response;
            },


            forceSet: target.forceSet.bind(target),

            avatar: target.avatar,

            target: target
        }
    }

    __saveToken(token)
    {
        Cookies.set('auth', token, {
            expires: AUTH_TOKEN_EXPIRES 
        });

        Object.assign(Http.defaultHeaders, this.__creationails());
    }
    
    __removeToken() 
    {
        Cookies.remove('auth');

        delete Http.defaultHeaders['Authorization'];
    }

    __creationails()
    {
        let token = Cookies.get('auth');
        
        if (!!!token)
            return null;
        
        return  {'Authorization': 'Bearer ' + token };
    }

    __changed(data)
    {
        for (let callback of this.__callbacks)
            callback(data);
    }

    onChange(callback)
    {
        this.__callbacks.push(callback);
    }

    async register(data)
    {
        let response = await Http.post({ uri: 'register', data }); 
        
        if (!!!response.data || !!!response.data.auth)
            throw Error('Incorrect http response');

        // Handling token
        this.__saveToken(response.data.auth);
        delete response.data.auth;

        // Caching response
        this.user.forceSet(response.data);
        this.user.avatar.get(true);

        // Calling callbacks
        this.__changed(true);

        return response;
    }

    async login(data) 
    {
        let response = await Http.post({ uri: 'login', data })
            .catch(error => {
                this.__removeToken();
                throw error;
            });

        if (!!!response.data && !!!response.data.auth)
            throw Error('Incorrect http response');

        // Handling token
        this.__saveToken(response.data.auth);
        delete response.data.auth;

        // Caching response
        this.user.forceSet(response.data);
        this.user.avatar.get(true);

        // Calling callbacks
        this.__changed(true);   
        
        return response;
    }

    async logout()
    {
        let response = await Http.post({uri: 'logout'})
            .catch(error => {
                this.__removeToken();
                throw error;
            });

        // Handling token
        this.__removeToken();

        // Caching response
        this.user.forceSet(null);

        // Calling callbacks
        this.__changed(false);

        return response;
    }

    async verifyEmail(data) {
        let response = await Http.post({
            data, uri: 'verify'
        });
        
        this.user.target.__user.verified = true;

        return response;
    }

    async resendCode(newEmail) {
        let data = null;

        if (newEmail) {
            data = new FormData();
            data.append('newEmail', newEmail)
        }

        let response = await Http.post({
            data, uri: 'verification/resend'
        });

        this.user.target.__user.email = newEmail;

        return response;
    }

    async createRecovery(data = null) {
        let response = await Http.post({
            data, uri: 'recovery'
        });
        
        return response;
    }

    async resendRecovery(data = null) {
        let response = await Http.post({
            data, uri: 'recovery/resend'
        });

        return response;
    }

    async confirmRecovery(data) {
        let response = await Http.post({
            data, uri: 'recovery/confirm'
        });

        if (!!!data.get('email'))
            return response;

        if (!!!response.data && !!!response.data.auth)
            throw Error('Incorrect http response');

        this.__saveToken(response.data.auth);
        delete response.data.auth;

        
        return response;
    }

    async check() 
    {
        return Boolean(await this.user.get());
    }
}

window.Auth = new Auth();

export default window.Auth;