
import Model from '@models/Model'
import FormatedDate from '@services/FormatedDate'

class Updates extends Model 
{
    castCreatedAt(value) 
    {
        return FormatedDate.parse(value);
    }

    path = 'updates'
}

export default new Updates();