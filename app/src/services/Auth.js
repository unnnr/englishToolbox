import Cookies from 'js-cookie'
import Http from '@services/Http'
import User from '@models/User';

const AUTH_TOKEN_EXPIRES = 12;

class Auth {

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

    async register(data)
    {
        let response = await Http.post({ uri: 'register', data }); 

        if (!!!response.data || !!!response.data.auth)
            throw Error('Incorrect http response');

        this.__saveToken(response.data.auth);

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

    user = User;
}

export default new Auth();