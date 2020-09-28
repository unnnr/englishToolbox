
import PromiseQueue from '@services/PromiseQueue'
import ApiRequest from '@services/ApiRequest'

class Api 
{
    getCsrfToken() 
    {
        
    }

    setCredetinals(credetionals) 
    {
        this.request.credetionals = credetionals;
    }

    request = ApiRequest;

    queue = PromiseQueue;
}

export default new Api();