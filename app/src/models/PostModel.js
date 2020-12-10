
import FormatedDate from '@services/FormatedDate'
import Favorites from '@models/Favorites'
import Updates from '@models/Updates'
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
        comment.createdAt = 
            FormatedDate.parse(comment.createdAt);
            
        comment.user.createdAt = 
            FormatedDate.parse(comment.user.createdAt);
        
        return response.data;
    }

    async create() {
        let post = await super.create(...arguments);
        Updates.dropCache();

        return post;
    }

    async edit() {
        let post = await super.edit(...arguments);
        Updates.dropCache();

        return post;
    }

    async delete() {
        await super.delete(...arguments);
        Updates.dropCache();
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