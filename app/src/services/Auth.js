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
        Csookies.set('auth', token, {
            expires:AUTH_TOKEN_EXPIRES 
        });
    }
    
    __removeToken() 
    {
        Cookies.remove('auth');
    }

    __creationails()
    {
        return  {'Authorization': 'Bearer ' + '9|rU4WewakG9qp10q41JLQhhlUOAzEyb7idKDv4tIc3UvPzJp22KIu2ZUhOtA8HYMnesEDYnujlycx6fq7' };

        let token = Cookies.get('auth');
        
        if (!!!token)
            return null;
        
        return  {'Authorization': 'Bearer ' + token };
    }

    async login(data) 
    {
        let response = await Http.post('login', data)
            .catch(error => {
                this.__removeToken();
                throw error;
            });

        if (!!!response.authToken)
            throw Error('Incorrect http response');

        this.__saveToken(response.authToken);

        return response;
    }

    async register(data)
    {
        let response = await Http.post('register', data); 

        if (!!!response.authToken)
            throw Error('Incorrect http response');

        this.__saveToken(response.authToken);

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