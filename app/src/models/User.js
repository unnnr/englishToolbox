import Http from '@services/Http'

class User 
{
    __user;

    forceSet(user) 
    {
        this.__user = user;
    }

    __parseResponse(response)
    {
        return response.data;
    }

    __catchError(error)
    {
        if (error  && typeof error === 'object'
                   && error.status === 401)
            return null;
    
        throw error;
    }

    __makeResponse()
    {        
        if (this.__user === null)
            return this.__user;
        
        return { ...this.__user }
    }

    async get() 
    { 
        if (this.__user)
            return this.__user;

        let uri = this.path;

        this.__user = await Http.get({ uri })
        
        .then(this.__parseResponse)

        .catch(this.__catchError);

        return this.__makeResponse();
    }

    async edit(data) 
    {
        this.__user = await Http.patch({
            data, uri: this.path
        })
  
        .then(this.__parseResponse)

        .catch(this.__catchError);

        return this.__makeResponse();
    }

    async delete()
    {
        let response = await Http.delete({
            uri: this.path
        })

        .then(this.__parseResponse)

        .catch(this.__catchError);

        return response.data;
    }

    path = 'profile';
}

window.User = new User();

export default window.User;
