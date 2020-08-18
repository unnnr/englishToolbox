
import Http from '@services/Http';

const Tags = new function ()
{
    this.all = async () =>
    {
        let tags = await Http.get('tags');

        return tags;
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
}();
   
export default Tags;