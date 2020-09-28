const Http = new function() 
{
    function prepareOptions(options) 
    {
        if (!!!options || typeof options !== 'object')
            options = {};

        if (!!!options.headers || typeof options.headers !== 'object')
            options.headers = {};
        
        Object.assign(options.headers, {
            // 'X-CSRF-TOKEN': token,
            'X-Requested-With': 'XMLHttpRequest',
            'Accept':'application/json',
            'Sec-Fetch-Site': 'cross-site'
        })


        options.body = options.data;

        return options;
    }

    function prepareRequest(options) 
    {
        let { uri, body, headers, method } = prepareOptions(options);

        let url = Http.origin + uri;

        return [ url , { method, body, headers }];
    }

    function sendRequest(request) {
        console.log(...request);
        return fetch(...request);
    }


    function parseData(response)
    {
        let contentType = response.headers.get('Content-Type');

        if (contentType === 'application/json')
            return response.json(); 
        
        return response.text();
    } 

    async function parseResponse(response)
    {
        let data = await parseData(response);

        if (response.ok)
            return data;
        
        throw {
            name: 'Failed reuqest',

            status: response.status,

            message: response.statusText,

            body: data
        }
    }

    async function make(options) 
    {
        let request = prepareRequest(options);
        
        let response = await sendRequest(request);

        let data = await parseResponse(response);

        return data;
    }

    function validateOptions(options)
    {
        if (options !== null && typeof options === 'object')
            return;

        throw {
            name: 'Incorrect argumets',
            message: 'options must be of the Object type'
        };
    }

    function createCustomMethod(method) 
    {
        return function (options)
        {
            validateOptions(options);

            options.method = 'POST';

            let data = options.data;

            if (!!!(data instanceof FormData))
                options.data = new FormData();
                
            options.data.append('_method', method);

            return make(options);
        }
    }

    this.get = function(options) 
    {
        validateOptions(options);

        options.method = 'GET';

        return make(options);
    }
    
    this.post = function(options) 
    {
        validateOptions(options);

        options.method = 'POST';

        return make(options);
    }

    this.put = createCustomMethod('PUT');

    this.patch = createCustomMethod('PATCH');

    this.delete = createCustomMethod('DELETE');


    this.origin = window.location.origin + '/api/';
}();

Http.origin = 'http://etoolbox/api/';

window.Http = Http;

export default Http;
