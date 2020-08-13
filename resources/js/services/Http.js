const Http = new function()
{   
    this.make = async function (method, path, formData)
    {
        let token = document.querySelector('meta[name="csrf-token"]').content;
        // data.set('_token', token);
    
        let response = await fetch(window.location.origin + path ? '/api/' + path : '' , {
            method: method, 
            body: formData,
            headers: {
                'X-CSRF-TOKEN': token,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept':'application/json'
            }
        })

        if (!!!response.ok)
            return null;
        
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

    this.put = function ()
    {
        return self.make('PUT', ...arguments)
    }

    this.patch = function ()
    {
        return self.make('PATCH', ...arguments)
    }

    let self = this;
}();

export default Http;