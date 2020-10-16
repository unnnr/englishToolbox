
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

    async comments(videoId)
    {
        return await Http.get({
            uri: `${this.path}/${videoId}/comments`
        });
    }

    path = 'videos';
}

window.Videos = new Videos();

export default new Videos();