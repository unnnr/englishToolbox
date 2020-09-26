
import Model from '@models/Model'; 
import FormatedDate from '@services/FormatedDate'

class Videos extends Model 
{
    convert_created_at(value) 
    {
        return FormatedDate(value);
    }

    path = 'videos';
}

export default new Videos();
