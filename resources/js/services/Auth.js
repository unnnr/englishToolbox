import Http from '@services/Http';

const Auth = new function() {

    this.login = async (data) => 
    {
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
                max: 64,
                min: 5
            },

            name: {
                max: 32, 
                min: 3
            }
        }
    }
}();

export default Auth;