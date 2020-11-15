
import Model from '@models/Model' 

class Bans extends Model
{
    path = "bans"

    async create(data)
    {
        let response = await Http.post({
            data, uri: this.path
        });

        let item  = this.__parseInstance(response.data);

        return this.__cache.__createCopy(item);
    }

    async all()
    {
        return super.all(true);
    }
}

export default new Bans();