
import Http from '@services/Http';
import FormatedDate from '@services/FormatedDate'

const Updates = new function ()
{
    async function load()
    {
        updates = await Http.get('api/updates');
        
        loaded = true;

        for (const callback of callbacks)
            callback();
    } 

    function createInstance(response)
    {        
        return {
            id: response.id,
            title: response.title, 
            description: response.description,
            date: FormatedDate.parse(response.createdAt),
            thumbnail: response.thumbnail
        }
    }

    this.all = () =>
    {
        let selectedComments = [];
    
        for (const update of updates)
        {
            selectedComments.push(
                createInstance(update)
            );              
        }
        
        return selectedComments;
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

    let updates = [];
    let loaded  = false;
    let callbacks = [];

    load();
}();
   
export default Updates;