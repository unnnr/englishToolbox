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

        options.url = (options.origin || window.origin) +  options.uri;

        return options;
    }

    function prepareRequest(options) 
    {
        let { url, body, headers, method } = prepareOptions(options);

        return [ url , { method, body, headers }];
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

    this.make = async function (options) 
    {
        let request = prepareRequest(options);
        
        let response = await sendRequest(request);

        let data = await parseResponse(response);

        return data;
    }
}();


export default Http;