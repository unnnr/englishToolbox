
import Http from '@services/Http';

class Model 
{
    castPrefix = 'convert_';
    
    createInstance(data) 
    {
        let instance = {};

        for (const [key, value] of Object.entries(data))
        {
            let castName = this.castPrefix + key;

            if (typeof this[castName] === 'function')
                instance[key] = this[castName](value); 
            else 
                instance[key] = value
        }

        return instance;
    }

    createCollection(list) 
    {
        let collection = [];

        for (const item of list)
            collection.push(this.createInstance(item));

        return collection
    }

    async create(data)
    {
        let uri = this.path;

        let response = await Http.post({
            uri, data
        });

        return response.data;
    }

    async get(id) 
    { 
        let uri = this.path + '/' + id;

        let response = await Http.get({
            uri
        });

        return response.data;
    }

    async edit(id, data) 
    {
        let uri = this.path + '/' + id;

        let response = await Http.patch({
            uri, data
        });

        return response.data;
    }

    async delete(id)
    {
        let uri = this.path + '/' + id;

        let response = await Http.delete({
            uri
        });

        return response.data;
    }

    async all()
    {
        let uri = this.path;

        console.log('here');
        let response = await Http.get({
            uri
        });

        return this.createCollection(response.data);
    }
}


export default Model;