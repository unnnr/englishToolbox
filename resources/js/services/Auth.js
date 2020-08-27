import Http from '@services/Http';

const Auth = new function() {

    this.login = async (data) => 
    {
        let respose = await Http.post('login', data);

        console.log(respose); 
    }

    this.register = async (data) =>
    {
        let respose = await Http.post('register', data);

        console.log(respose); 
    }


    this.check = () =>
    {

    }

    this.user = () =>
    {

    }

}();

export default Auth;