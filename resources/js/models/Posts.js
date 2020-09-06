const Wrapper = new Proxy({}, {
    get(dummy, property)
    {
        if (property === 'self')
            return Posts;
        else    
            return target[property];
    }
});

let Posts = new function ()
{
    this.track = (newTarget) =>
    {
        console.log(newTarget);
        target = newTarget;
    }
}();

let target = {};


export default Wrapper;