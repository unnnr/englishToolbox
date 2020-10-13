
import Model from '@models/Model'

class Reviews extends Model 
{
    path = 'reviews';

    async pending() 
    {
        let response = await Http.get({
            uri: this.path + '/pending'
        });

        let instaces = this.__parseCollection(response.data); 
        
        return this.__cache.concut(instaces);
    }

    async verified()
    {
        let response = await Http.get({
            uri: this.path + '/verified'
        });

        let instaces = this.__parseCollection(response.data); 
        
        return this.__cache.concut(instaces);
    }

    verify(id) 
    {
        let data = new FormData();

        data.append('verified', true);

        return this.edit(id, data)
    }
}

export default new Reviews();