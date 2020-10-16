
import Model from '@models/Model'; 
import FormatedDate from '@services/FormatedDate'

class Videos extends Model 
{
    castCreatedAt(value) 
    {
        return FormatedDate.parse(value);
    }

    compareVideoUrl(newValue, cached)
    {
        if ('https://youtube.com/watch?v=' + newValue === cached)
            return false;

        return true;
    }

    comments = {
        async get(videoId)
        {
            let response = await Http.get({
                uri: `videos/${videoId}/comments`
            });
    
            return response.data;
        },

        async create(data)
        {
            let response = await Http.post({
                data, uri: `videos/${videoId}/comments`
            }); 

            return response.data;
        }
    }

    path = 'videos';
}

window.Videos = new Videos();

export default new Videos();