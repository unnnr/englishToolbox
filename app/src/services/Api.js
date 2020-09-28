
import Http from '@services/Http'
import PromiseQueue from '@services/PromiseQueue'
import ApiRequest from '@services/ApiRequest'

class Api 
{
    getCsrfToken() 
    {
        
    }

    request = new ApiRequest();
    // Allowed request

    // Requests queue
    queue = new PromiseQueue();
}

export default new Api();
