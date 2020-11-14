
import Http from '@services/Http';
import Cache from '@models/ModelCache'

class Model 
{    
    __cache = new Cache();

    __capitalizeFirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    __parseInstance(data) 
    {
        const PREFIX = 'cast';
        
        for (const [name, value] of Object.entries(data))
        {
            let cast = this[PREFIX + this.__capitalizeFirst(name)];

            if (typeof cast === 'function')
                data[name] = cast(value); 
        }

        return data;
    }

    __parseCollection(list) 
    {
        for (const item of list)
            this.__parseInstance(item);

        return list;
    }

    __clearData(data, saved) 
    {
        // Computing function prefix
        const PREFIX = 'compare';

        for (let [name, value] of data.entries())
        {
            console.log(PREFIX + this.__capitalizeFirst(name));

            // Comput comparing function
            let compare = this[PREFIX + this.__capitalizeFirst(name)];
            
            console.log(compare);
            // Check if it exist`s
            if (typeof compare === 'function')
            {
                if (compare(value, saved))
                    data.delete(name);

                continue;
            }
            
            // In case if not, try to roufly 
            // compare with it cached value
            if (value === saved[name])
                data.delete(name);
        }

        return data;
    }


    async create(data)
    {
        let response = await Http.post({
            data, uri: this.path
        });

        let item  = this.__parseInstance(response.data);

        return this.__cache.push(item);
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

        let instance = this.__parseInstance(response.data);

        return  this.__cache.set(instance);
    }

    async edit(id, data) 
    {
        // Removing redundunt fields
        let saved = this.__cache.get(id);
        
        if (saved)
            this.__clearData(data, saved);

        // Sending requests
        let response = await Http.patch({
            data, uri:  this.path + '/' + id
        });

        if (!!!response.data)
            return;
            
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

        let instaces = this.__parseCollection(response.data); 
        
        return this.__cache.clear(instaces);
    }
}

export default Model;