
import Model from '@models/Model'; 
import FormatedDate from '@services/FormatedDate'


class User 
{
    createInstance(data) 
    {
        let instance = {};

        for (const [key, value] of Object.entries(data))
        {
            let castName = key;

            if (typeof this[castName] === 'function')
                instance[key] = this[castName](value); 
            else 
                instance[key] = value
        }

        return instance;
    }

    forceSet(user) {

    }

    get() 
    { 
        let uri = this.path;

        return Http.get({ uri })
        
        .then(response => response.data)
        
        .catch(response => {
            if (response 
                && typeof response === 'object'
                && response.status === 401)
            {
                return null;
            }
            
            throw Error(response);
        });
    }

    async edit(data) 
    {
        let uri = this.path;

        let response = await Http.patch({
            uri, data
        });

        return response.data;
    }

    async delete()
    {
        let uri = this.path;

        let response = await Http.delete({
            uri
        });

        return response.data;
    }

    path = 'profile';
}

window.User = new User();

export default new User();
