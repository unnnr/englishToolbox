import Cookies from 'js-cookie'
import Http from '@services/Http'
import User from '@models/User';

const AUTH_TOKEN_EXPIRES = 12;

class Auth {
    
    __callbacks = [];
    
    user = User;

    constructor() 
    {
        this.__updateHttp();
    }

    __updateHttp()
    {
        let creationails = this.__creationails();

        if (creationails)
            Object.assign(Http.defaultHeaders, creationails);
    }

    __saveToken(token)
    {
        Cookies.set('auth', token, {
            expires:AUTH_TOKEN_EXPIRES 
        });
    }
    
    __removeToken() 
    {
        Cookies.remove('auth');
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

        this.__saveToken(response.data.auth);
        
        // Preventing of redundunt requests
        delete response.data.auth;

        this.user.forceSet(response.data);

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

        this.__saveToken(response.data.auth);
        
        // Preventing of redundunt requests
        delete response.data.auth;

        this.user.forceSet(response.data);

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

        this.__removeToken();

         // Preventing of redundunt requests
         this.user.forceSet(null);

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