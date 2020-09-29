import Cookies from 'js-cookie'
import Http from '@services/Http'
import User from '@models/User';

const Auth = new function() {

    function init() 
    {
        updateHttp();
    }

    function updateHttp()
    {
        let creationails = getCreationails();

        if (creationails)
            Object.assign(Http.defaultHeaders, creationails);
    }

    function saveToken(token)
    {
        Csookies.set('auth', token, {
            expires:AUTH_TOKEN_EXPIRES 
        });
    }
    
    function removeToken() 
    {
        Cookies.remove('auth');
    }

    function getCreationails()
    {
        return  {'Authorization': 'Bearer ' + '9|rU4WewakG9qp10q41JLQhhlUOAzEyb7idKDv4tIc3UvPzJp22KIu2ZUhOtA8HYMnesEDYnujlycx6fq7' };

        let token = Cookies.get('auth');
        
        if (!!!token)
            return null;
        
        return  {'Authorization': 'Bearer ' + token };
    }

    this.user = () => {
        return User;
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