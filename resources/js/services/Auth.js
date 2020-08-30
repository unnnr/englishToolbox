import Http from '@services/Http';
import axios from 'axios';


const Auth = new function() {

    this.login = async (data) => 
    {
        // await axios.get('/api/csrf-cookie');
        
        let respose = await axios({
            method: 'post',
            url: '/api/login',
            withCredentials: true,
            headers: {'Content-Type': 'multipart/form-data' },
            data: data
        });

        return respose;
    }

    this.register = async (data) =>
    {
        let respose = await Http.post('api/register', data);

        console.log(respose); 
    }


    this.check = () =>
    {

    }

    this.user = () =>
    {

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