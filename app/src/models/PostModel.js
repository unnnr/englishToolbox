
import FormatedDate from '@services/FormatedDate'
import Favorites from '@models/Favorites'
import Model from '@models/Model'; 

class PostModel extends Model 
{
    async comments(postId)
    {
        let response = await Http.get({
            uri: this.path + `/${postId}/comments`
        });
        
        for (let comment of response.data)
            comment.createdAt = FormatedDate.parse(comment.createdAt);

        return response.data;
    }

    async postComment(postId, data)
    {
        let response = await Http.post({
            data, uri: this.path + `/${postId}/comments`
        }); 

        let comment = response.data;
        comment.createdAt = FormatedDate.parse(comment.createdAt);
        
        return response.data;
    }
    
    castCreatedAt(value) 
    {
        return FormatedDate.parse(value);
    }

    makeFavorite(id) {
        let data = new FormData();
        data.append('postId', id);

        return Favorites.create(this.path, data);
    }

    favorites() {
        return Favorites.get(this.path);
    }
}

export default PostModel;