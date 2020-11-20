
import Model from '@models/Model' 
import Http from '@services/Http'

class Favorites extends Model
{
    path = 'profile/favorites';

    async create(postType, data)
    {
        let response = await Http.post({
            data, uri: this.path + `/${postType}`,
        });

        return response.data;
    }

    async get(type) 
    {
        let response = await Http.get({
            uri: this.path + '/' + type,
        });

        return response.data;    
    }

    async all() 
    {
        return await super.all(true)
    }
}

export default new Favorites();