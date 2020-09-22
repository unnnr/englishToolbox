const Http = new function() 
{
    function prepareHeaders(headers = null) 
    {
        if (!!!headers || typeof headers !== 'object')
            headers = {};
        
        Object.assign(headers, {
            // 'X-CSRF-TOKEN': token,
            'X-Requested-With': 'XMLHttpRequest',
            'Accept':'application/json',
        })
    }

    function prepareRequest(options) 
    {
        let { uri, data, headers, method } = options;

        let body = data;

        let url = Http.origin + uri;

        console.log(Http.origin + uri);
        
        prepareHeaders(headers);

        return [ url , { method, headers, body }];
    }

    function sendRequest(request) {
        return fetch(...request);
    }


    function parseData(response)
    {
        let contentType = response.headers.get('Content-Type');

        if (contentType === 'application/json')
            return response.json(); 
        
        return response.text();
    } 

    function parseResponse(response)
    {
        let data = parseData(response);

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

        let data = parseResponse(response);

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
                options.data =  new FormData();
                
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
