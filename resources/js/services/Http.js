const Http = new function()
{   
    this.make = async function (method, path, data, additional = {})
    {
        let token = document.querySelector('meta[name="csrf-token"]').content;
        // data.set('_token', token);
        
        let options = {
            method: method, 
            body: data,
            headers: {
                'X-CSRF-TOKEN': token,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept':'application/json',
            }
        };

        for (let header of Http.defaultHeaders)
        {
            let key = Object.keys(header)[0];
            let value = header[key];
            
            options.headers[key] = value;
        }

        console.log('befpasd');

        if (Array.isArray(additional.headers))
            options.headers.push(...additional.headers);



        if (additional.json)
            options.headers['Content-Type'] = 'application/json';

        console.log('somebsads');


        let response = await fetch(window.location.origin + path ? '/' + path : '' , options);

        if (!!!response.ok)
        {
            let body;

            if (response.headers.get('Content-Type') === 'application/json')
                body =  await response.json(); 
            else 
                body =  await response.text(); 

            throw {
                name: 'Failed request',
                message: response.statusText,
                status: response.status,
                body: body,
            };
        }
        
        let contentType  = response.headers.get("Content-Type") 
        if (contentType === 'application/json')
        {   
            response = await response.json();

            return response.data;
        }

        return response.text();
    }

    this.get = function ()
    {
        return self.make('GET', ...arguments)
    }
    
    this.post = function ()
    {
        return self.make('POST', ...arguments)
    }

    this.put = function (path, data)
    {
        data.append('_method', 'PUT');

        return self.make('POST', path, data);
    }

    this.patch = function (path, data)
    {
        data.append('_method', 'PUT');

        return self.make('POST', path, data)
    }

    this.delete = function (path, data = new FormData)
    {
        data.append('_method', 'DELETE');

        return self.make('POST', path, data)
    };

    this.defaultHeaders = [];

    let self = this;
}();

export default Http;