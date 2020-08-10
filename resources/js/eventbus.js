const Bus = new function ()
{
    this.listen = (event, callback) =>
    {
        if (typeof event !== 'string')
            return false;

        if (!!!listeners[event])
            listeners[event] = [];    
        
        listeners[event].push(callback); 

        return true;
    }

    this.dispatch  = (event, options = {}) =>
    {
        if (typeof event !== 'string')
            return false;

        if (!!!listeners[event])
            return false;

        for (const callback of listeners[event])
            callback(options);

        return true;
    }

    this.remove = (event, callback) =>
    {
        if (typeof event !== 'string')
            return false;

        let index = listeners[event].indexOf(callback);

        if (index === -1)  
            return false;
        
        listeners[event].splice(index, 1);

        return true;
    }
}();

let listeners = []

export default Bus;