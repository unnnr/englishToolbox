
import Http from './Http';

const Tags = new function ()
{
    this.all = async () =>
    {
        let tags = await Http.get('tags');

        return tags;
    }

    this.create = async (tags) =>
    {
        let data = [];
        for (const tag of tags)
            data.push({
                label: tag.label,
                color: tag.color,
                return: tag.selected
            });
        
        let json = JSON.stringify({ data });

        let reponse = await Http.post('tags', json, true);

        return reponse;
    }

    this.remove = async () =>
    {
        
    }
}();
   
export default Tags;