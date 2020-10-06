
class Avatar 
{
    __avatar = null;

    path = 'profile/avatar';
    
    __parseResponse(response)
    {
        return response.data.url;
    }

    async edit(data)
    {
        if (!!!(data instanceof FormData) )
            throw Error('data must be FormData instance');

        if (!!!data.has('avatar'))
            throw Error('data cant be empty');

        this.__avatar = await Http.patch({
            data, uri: this.path
        })
        .then(this.__parseResponse);

        return this.__avatar;
    }

    async get(preventCaching = false) 
    {
        if (this.__avatar && !!!preventCaching)
            return this.__avatar;

        this.__avatar = await Http.get({ uri: this.path })
    
        .then(this.__parseResponse);

        return this.__avatar;
    }
} 

export default new Avatar();