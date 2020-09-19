export default new function()
{
    function init()
    {
        function firstToUpper(string)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
      
        for (let link of [...links, ...additional])
        {
            let uri = link.uri;

            if (!!!uri)
                uri  = link.name;

            if (activeUri.startsWith(uri))
                link.active = true;

            if (!!!link.active)
                link.url = window.origin + '/' + firstToUpper(uri);
            else 
                link.url = "#";
        }       
    }

    this.redirectUrl = (name) =>
    {
        for (const {name, url, active} of [...links, ...additional])
        {
            if (name !== name)
                continue;

            if (active)
                break;

            return url;
        } 

        return '#';
    } 

    this.links = () => 
    {
        let linksCopy = [];

        // Retrieves current uri without slash at the begining
        let activeUri = location.pathname.substr(1);

        for (let link of links)
        {
            let instaceCopy = { ...link};
                
            if (activeUri == link.url)
                instanceCopy.active = true;

            
        }

        return linksCopy;
    }

    let links =  [
        { name: 'About', label: 'about me',uri:'home' },

        { name: 'Videos'},

        { name: 'Audio'},

        { name: 'Schemas'},

        { name: 'Games',},

        { name: 'Recommended', label: 'I recommend', uri:'recommend' },

        { name: 'profile', additional: true},
        { name: 'register', additional: true},
        { name: 'login'},
        { name: 'home'},
    ];

    init();
}();