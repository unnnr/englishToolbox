
import Http from '@services/Http'

class Api 
{
    constructor() 
    {
        
    }


    getCsrfToken() 
    {
        
    }



    // Allowed request
    request = [
        'get',
        'put',
        'post',
        'patch',
        'delete',
        'options'
    ]

    // Requests queue
    queue = new PromiseQueue();
}

window.Api = new Api();

