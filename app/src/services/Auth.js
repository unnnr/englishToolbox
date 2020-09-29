import Cookies from 'js-cookie'
import Http from '@services/Http'

const Auth = new function() {

    function init() 
    {
        Object.assign(Http.defaultHeaders, this.creationails())
    }

    function saveToken(token)
    {
        Csookies.set('auth', token, {
            expires:AUTH_TOKEN_EXPIRES 
        });

        Http.defaultHeaders = [{'Authorization': 'Bearer ' + token}];
    }
    
    function removeToken() 
    {
        Cookies.remove('auth');
    }

    this.creationails = () =>
    {
        return  {'Authorization': 'Bearer ' + Cookies.get('auth')};
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

    init.call(this);
}();

export default Auth;