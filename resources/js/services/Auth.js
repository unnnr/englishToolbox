import Http from '@services/Http';
import axios from 'axios';


const Auth = new function() {

    this.login = async (data) => 
    {
        // await axios.get('/api/csrf-cookie');
        
        /* let response = await axios({
            method: 'post',
            url: '/api/login',
            withCredentials: true,
            headers: {'Content-Type': 'multipart/form-data' },
            data: data
        }); */


        let response = await Http.post('login', data);

        return response;
    }

    this.register = async (data) =>
    {
        let response = await Http.post('register', data);

        console.log(response); 
    }


    this.check = () =>
    {

    }

    this.user = () =>
    {

    }

    this.isVerified = () =>
    {
        return false;
    }

    this.rules = () =>
    {
        return {
            password: {
                max: 20,
                min: 8
            },

            name: {
                max: 30, 
                min: 5
            }
        }
    }

    // axios.defaults.withCredentials = true;
}();

export default Auth;