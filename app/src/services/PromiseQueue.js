class PromiseQueue 
{
    add(promise) 
    {        
        console.log('added', this.pending);

        this.queue.push(promise);

        if (!!!this.pending)
        {
            this.pending = true;
            this.resolve();
        }
    }

    resolve()
    {
        if (this.empty())
            return this.pending = false;

        let promise = this.queue.shift();

        promise().then(this.resolve.bind(this));
    }

    empty() {
        return !!!this.queue.length;
    }

    catch() 
    {
        
    }

    queue = [];
    
    errorHadnler = null;

    pending = false;
}