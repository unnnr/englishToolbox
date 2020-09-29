
import Http from '@services/Http';
import Cache from '@models/ModelCache'

class Model 
{    
    __cache = new Cache();

    __parseInstance(data) 
    {
        for (const [key, value] of Object.entries(data))
        {
            let castName = key;

            if (typeof this[castName] === 'function')
                data[key] = this[castName](value); 
        }

        return data;
    }

    __parseCollection(list) 
    {
        for (const item of list)
            this.__parseInstance(item);

        return list;
    }

    __clearData(data, chached) 
    {
        
    }

    async create(data)
    {
        let response = await Http.post({
            data, uri: this.data
        });

        let item = this.__cache.push(response.data);

        return this.__parseInstance(item);
    }

    async get(id, notCached = false) 
    {
        if  (!!!notCached)
        {
            let data = this.__cache.get(id);

            if (data) 
                return data
        }

        let response = await Http.get({
            uri: this.path + '/' + id
        });

        let data = this.__cache.set(response.data);

        return this.__parseInstance(data);
    }

    async edit(id, data) 
    {
        let response = await Http.patch({
            data, uri:  this.path + '/' + id
        });

        let item = this.__cache.set(response.data);

        return this.__parseInstance(item);
    }

    async delete(id)
    {
        let response = await Http.delete({
            uri: this.path + '/' + id
        });

        this.__cache.remove(id);

        return response.data;
    }

    async all(notCached)
    {
        if (!!!notCached)
        {
            let data = this.__cache.get();

            if (data)
                return data;
        }

        let response = await Http.get({
            uri: this.path
        });

        let data = this.__cache.clear(response.data);
        
        return this.__parseCollection(data);
    }
}

export default Model;