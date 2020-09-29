class User 
{
    __user;

    forceSet(user) 
    {
        this.__user = user;
    }

    __parseResponse(__)
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

    async get() 
    { 
        let uri = this.path;

        this.__user = Http.get({ uri })
        
        .then(this.__parseResponse)

        .catch(__catchError);

        return { ...this.__user };
    }

    async edit(data) 
    {
        this.__user = await Http.patch({
            data, uri: this.path
        })
  
        .then(this.__parseResponse)

        .catch(__catchError);

        return { ...this.__user };
    }

    async delete()
    {
        let response = await Http.delete({
            uri: this.path
        })

        .then(this.__parseResponse)

        .catch(__catchError);

        return response.data;
    }

    path = 'profile';
}

window.User = new User();

export default window.User;
