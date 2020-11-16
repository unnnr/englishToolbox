
import Model from '@models/Model' 

class Favorites extends Model
{
    path = 'profile/favorites';

    async create(postType, data)
    {
        let response = await Http.post({
            data, uri: this.path + '/' + postType,
        });

        let item  = this.__parseInstance(response.data);

        return this.__cache.push(item);
    }
}

export default new Favorites();