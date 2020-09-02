export default new function()
{
    function init()
    {
        let activeUri = location.pathname.substr(1);
        
        for (let link of [...links, ...additional])
        {
            let uri = link.uri;

            if (!!!uri)
                uri  = link.label;

            if (activeUri.startsWith(uri))
                link.active = true;

            link.url = window.origin + '/' + uri;
        }       
    }

    this.all = () => 
    {
        return links;
    }

    this.redirectUrl = (name) =>
    {
        for (const {label, url, active} of [...links, ...additional])
        {
            console.log(label, name);
            if (label !== name)
                continue;

            if (active)
                break;

            console.log(url);
            return url;
        } 

        return '#';
    } 

    let links =  [
        { label: 'videos'},
        { label: 'audio'},
        { label: 'games',},
        { label: 'schemas'},
        { label: 'about me', uri:'home'},
        { label: 'i recommend', uri:'recommend'},
    ];

    let additional = [
        { label: 'profile'},
        { label: 'register'},
        { label: 'login'},
        { label: 'home'},
    ]

    init();
}();