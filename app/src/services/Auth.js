import Cookies from 'js-cookie'
import Http from '@services/Http'
import User from '@models/User';

const AUTH_TOKEN_EXPIRES = 12;

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
                let user = await target.edit(...args);

                dispatchIfChanged(user);

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
            expires:AUTH_TOKEN_EXPIRES 
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

    async check() 
    {
        return Boolean(await this.user.get());
    }

    rules()
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
}

export default new Auth();