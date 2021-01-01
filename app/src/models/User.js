import Http from '@services/Http'
import Avatar from '@models/Avatar';
import FormatedDate from '@services/FormatedDate'

class User 
{
    avatar = Avatar;

    path = 'profile';

    __user = 'loading';
    
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

    forceSet(user) 
    {
        this.__user = user;
    }

    async get() 
    { 
        if (this.__user !== 'loading')
            return this.__user;

        this._user = null;

        this.__user = await Http.get({ uri: this.path })
        .then(this.__parseResponse)
        .catch(this.__catchError);

        return this.__makeResponse();
    }

    async edit(data) 
    {
        if (!!!(data instanceof FormData) )
            throw Error('data must be FormData instance');

        if (data.get('newPassword') === '')
            data.delete('newPassword');

        if (data.get('confirmation') === '')
           data.delete('confirmation');

        if (data.get('name') === this.__user.name)
           data.delete('name');

        if (data.get('email') === this.__user.email)
           data.delete('email');

        this.__user = await Http.patch({
            data, uri: this.path
        })
        .then(this.__parseResponse)
        .catch(this.__catchError);

        return this.__makeResponse();
    }

    async delete(data)
    {
        let response = await Http.delete({
            data, uri: this.path
        })
        .then(this.__parseResponse)
        .catch(this.__catchError);

        return response;
    }

    async views()
    {
        let uri = this.path + '/views';

        let response = await Http.get({ uri })
        .catch(this.__catchError);
    
        return response.data;
    }

    async comments()
    {
        let response = await Http.get({
            uri: this.path + '/comments'
        })
        .catch(this.__catchError);
        
        if (response === null)
            return [];

        for (let comment of response.data)
            comment.createdAt = FormatedDate.parse(comment.createdAt);
            
        return response.data;
    }

    async deleteComments()
    {
        let response = await Http.delete({
            uri: this.path + '/comments'
        })
        .catch(this.__catchError);
            
        return response.data;
    }
}

window.User = new User();

export default window.User;
