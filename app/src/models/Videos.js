
import FormatedDate from '@services/FormatedDate'
import Favorites from '@models/Favorites'
import Model from '@models/Model'; 

class Videos extends Model 
{
    path = 'videos';

    castCreatedAt(value) 
    {
        return FormatedDate.parse(value);
    }

    compareVideoUrl(newValue, cached)
    {
        let link = 'https://youtube.com/watch?v=';

        return newValue === link + cached.youtubeId;
    }

    comments = {
        async get(videoId)
        {
            let response = await Http.get({
                uri: `videos/${videoId}/comments`
            });
            
            for (let comment of response.data)
                comment.createdAt = FormatedDate.parse(comment.createdAt);
    
            return response.data;
        },

        async create(videoId, data)
        {
            let response = await Http.post({
                data, uri: `videos/${videoId}/comments`
            }); 

            let comment = response.data;
            comment.createdAt = FormatedDate.parse(comment.createdAt);
            
            return response.data;
        }
    }

    makeFavorite(id) {
        let data = new FormData();
        data.append('postId', id);

        return Favorites.create('videos', data);
    }

    unFavorite(id) {
        return Favorites.delete('videos', id);
    }
}

window.Videos = new Videos();

export default new Videos();