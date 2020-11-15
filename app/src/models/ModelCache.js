class ModelCache
{
    data = [];

    __createCopy(data = this.data)
    {
        return JSON.parse(JSON.stringify(data));
    }

    __find(id) 
    {
        for (let item of this.data)
        {
            if (item.id === id)
                return item;
        }

        return null;
    }
    
    clear(withDefault = null)
    {
        if (typeof withDefault === 'array')
            throw Error('withDefault must have array type');

        this.data = withDefault ? this.__createCopy(withDefault) : [];

        return this.__createCopy(this.data);
    }

    get(id = null) 
    {
        console.log(this.data);

        if (this.data.length === 0)
            return null;

        if (id)
            return this.__createCopy(this.__find(id));
    
        return this.__createCopy(this.data);
    }

    set(value)
    {
        let item = this.__find(value.id);

        if (!!!item)
            item = this.push(value);
        else
            Object.assign(item, value);

        return this.__createCopy(item);
    }

    remove(id)
    {
        let item = this.__find(id);
        
        console.log(item);
        if (!!!item)
            return null;
            
        this.data.splice(id, 1);

        return this.__createCopy(item);
    }

    push(value) 
    {
        this.data.push(value);

        return this.__createCopy(value);
    }

    concut(array)
    {
        for (let item of array)
            this.set(item);

        return this.__createCopy(this.data);
    }
}

export default ModelCache;