
import Model from '@models/Model'; 
import FormatedDate from '@services/FormatedDate'

class Videos extends Model 
{
    createdAt(value) 
    {
        return FormatedDate.parse(value);
    }

    path = 'videos';
}

export default new Videos();
