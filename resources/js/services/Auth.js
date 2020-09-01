import Http from '@services/Http';

const Auth = new function() {

    async function init()
    {
        user = await Http.get('user');
        window.user = user; 
    }

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
        if (!!!user)
            return null;

        return { ...user };
    }

    this.isVerified = () =>
    {
        return user.verified;
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

    let user = null; 

    init();
}();

export default Auth;