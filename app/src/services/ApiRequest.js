
import Http from '@services/Http'

class ApiRequest
{
    origin = 'http://etoolbox/api/';

    withCustomMethod(method, path, data) 
    {
        if (!!!(data instanceof FormData))
            throw 'Options data must be an FormData instance';

        data.append('_methods', method);

        let options = this.createOptions(method, path, data);

        return Http.make(options);
    }

    createOptions(method, uri, data = null) 
    {   
        let origin  = this.origin;

        return { uri,  method, data, origin };
    }

    get(path)
    {
        let options = this.createOptions('GET', path);

        return Http.make(options);
    }

    post(path, data) 
    {
        let options = this.createOptions('POST', path, data);

        return Http.make(options);
    }

    put(path, data)
    {
        return this.withCustomMethod('PUT', path, data);
    }
    
    patch(path, data)
    {
        return this.withCustomMethod('PATCH', path, data);
    }

    delete(path, data)
    {
        return this.withCustomMethod('DELETE', path, data);
    }

}

window.send = new ApiRequest();

export default new ApiRequest();
