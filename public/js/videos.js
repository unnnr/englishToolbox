
const ViodeSender = new function() {
    
    function init()
    {
        form = document.querySelector('.selected__editor');

        form.addEventListener('submit', async event => {
            event.preventDefault();

            let responce = await send();

            if (responce.ok)
                recieve(responce);
            // else
            //  Error.show(12);
        });
    }

    function send()
    {
        let formData = new FormData(form);
        let method  = form.getAttribute('method');
        let url  = form.getAttribute('action');

        return fetch(url, {
            method: method,
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            }
        });
    }

    function recieve(responce)
    {
        console.log(responce);
    }

    let form;

    init();
}(); 

const ViodesPool = new function()
{
    this.add = function ()
    {
        
    }
}();

const VideoPlayer = new function ()
{
    this.showEditor = function ()
    {

    }

    this.showViode = function ()
    {

    }
}
