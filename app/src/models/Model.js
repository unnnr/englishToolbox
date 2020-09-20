
import Http from '@services/Http';

class Model 
{
    async create(data)
    {
        let uri = this.path;

        return Http.post({
            ulr, data
        })
    }

    async get(id) 
    { 
        let uri = this.path + '/' + id;

        return Http.get({
            uri
        })
    }

    async edit(id, data) 
    {
        let uri = this.path + '/' + id;

        return Http.get({
            uri, data
        })
    }

    async delete(id)
    {
        let uri = this.path + '/' + id;

        return Http.delete({
            uri
            })
    }
}