
import Model from '@models/Model'

class Reviews extends Model 
{
    path = 'reviews';

    verifiedLoaded = false;

    async pending() 
    {
        // Retrieving reviews list 
        let response = await Http.get({
            uri: this.path + '/pending'
        });
        
        let pending = this.__parseCollection(response.data); 
        
        return this.__cache.__createCopy(pending);
    }

    async verified()
    {
        // Retrieving reviews list
        let reviews = [];

        if (this.verifiedLoaded)
            reviews = this.__cache.get();
        else
        {
            let response = await Http.get({
                uri: this.path + '/verified'
            });
            
            let instaces = this.__parseCollection(response.data); 
            
            reviews = this.__cache.concut(instaces);
            this.verifiedLoaded = true;
        }

        // Searcing for verified
        let verified = [];
        for (let review of reviews)
        {
            if (review.verified)
                verified.push(review);
        }

        return verified;
    }

    verify(id) 
    {
        let data = new FormData();
        data.append('verified', true);

        return this.edit(id, data);
    }

}

export default new Reviews();