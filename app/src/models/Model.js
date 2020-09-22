
import Http from '@services/Http';

class Model 
{
    createInstance(data) 
    {
        let instance = [];

        for (const [key, value] of Object.entries(data))
        {
            let castName = castPrefix + key;

            if (typeof this[castName] === 'function')
                instance[key] = this[castName](value); 
            else 
                instance[key] = value
        }

        return instance;
    }
    
    async create(data)
    {
        let uri = this.path;

        return Http.post({
            uli, data
        });
    }

    async get(id) 
    { 
        let uri = this.path + '/' + id;

        return Http.get({
            uri
        });
    }

    async edit(id, data) 
    {
        let uri = this.path + '/' + id;

        return Http.get({
            uri, data
        });
    }

    async delete(id)
    {
        let uri = this.path + '/' + id;

        return Http.delete({
            uri
        });
    }

    async all()
    {
        let uri = this.path;

        return  Http.delete({
            uri
        });;
    }

    some="asd";
}

const castPrefix = 'convert_';

export default Model;