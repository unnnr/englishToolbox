class Http
{
    //origin = 'https://' + window.location.host + '/api/';
    origin = 'http://192.168.31.215/api/';

    defaultHeaders = {
         // 'X-CSRF-TOKEN': token,
         'X-Requested-With': 'XMLHttpRequest',
         'Accept':'application/json',
         'Sec-Fetch-Site': 'cross-site',
         'Access-Control-Allow-Origin':  'no-cors'
    };

    __prepareOptions(options) 
    {
        if (!!!options || typeof options !== 'object')
            options = {};

        if (!!!options.headers || typeof options.headers !== 'object')
            options.headers = {};
        
        Object.assign(options.headers, this.defaultHeaders)

        options.body = options.data;

        return options;
    }

    __prepareRequest(options) 
    {
        let { uri, body, headers, method } = this.__prepareOptions(options);

        let url = this.origin + uri;

        return [ url , { method, body, headers}];
    }

    __sendRequest(request) {
        return fetch(...request);
    }


    __parseData(response)
    {
        let contentType = response.headers.get('Content-Type');

        if (contentType === 'application/json')
            return response.json(); 
        
        return response.text();
    } 

    async __parseResponse(response)
    {
        let data = await this.__parseData(response);

        if (response.ok)
            return data;
        
        throw {
            name: 'Failed reuqest',

            status: response.status,

            message: response.statusText,

            body: data
        }
    }

    async __make(options) 
    {
        let request = this.__prepareRequest(options);
        
        let response = await this.__sendRequest(request);

        let data = await this.__parseResponse(response);

        return data;
    }

    __validateOptions(options)
    {
        if (options !== null && typeof options === 'object')
            return;

        throw {
            name: 'Incorrect argumets',
            message: 'options must be of the Object type'
        };
    }

    __createCustomMethod(method) 
    {
        return function (options)
        {
            this.__validateOptions(options);

            options.method = 'POST';

            let data = options.data;

            if (!!!(data instanceof FormData))
                options.data = new FormData();
                
            options.data.append('_method', method);

            return this.__make(options);
        }
    }

    get(options) 
    {
        this.__validateOptions(options);

        options.method = 'GET';

        return this.__make(options);
    }
    
    post(options) 
    {
        this.__validateOptions(options);

        options.method = 'POST';

        return this.__make(options);
    }

    put = this.__createCustomMethod('PUT');

    patch = this.__createCustomMethod('PATCH');

    delete = this.__createCustomMethod('DELETE');
}

window.Http = new Http();

export default window.Http ;