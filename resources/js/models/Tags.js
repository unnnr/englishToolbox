
import Http from '@services/Http';

const Tags = new function ()
{
    async function load()
    {
        tags = await Http.get('tags');
        
        loaded = true;

        for (const callback of callbacks)
            callback();
    } 

    this.all = (withoutDefault = true) =>
    {
        let selectedTags = [];
    
        for (const tag of tags)
        {
            if (!!!withoutDefault || !!!tag.default)
                selectedTags.push({
                    ...tag
                });
        }
        
        return selectedTags ;
    }
    
    this.create = async (data) =>
    {
        let resonse = await Http.post('tags', data);
        
        return {
            color: resonse.color, 
            label: resonse.label,
            id: resonse.id
        } ;
    }

    this.remove = async () =>
    {
        
    }

    this.onload = (callback) =>
    {
        if (loaded)
        {
            callback();
            return;
        }

        callbacks.push(callback);
    }

    let tags = [];
    let loaded  = false;
    let callbacks = [];

    load();
}();
   
export default Tags;