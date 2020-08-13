
import Http from './Http';

const Tags = new function ()
{
    this.all = async () =>
    {
        let tags = await Http.get('tags');

        return tags;
    }

    this.createTag = async () =>
    {
        
    }

    this.remove = async () =>
    {
        
    }
}();
   
export default Tags;