import bus from '@services/eventbus'

const HandleRequests = {
	data() {
		return {
			loading: false,
		}
	},
	
	methods: {
    parseError(data) {
      if (!!!data || typeof data !== 'object')
        return null;

      let body = data.body;
      if (!!!body || typeof body !== 'object')
        return null;

      let errors = body.errors;
      if (!!!errors || typeof errors !== 'object')
        return null;

      let parsedErrors = {};
      for (let [key, value] of Object.entries(errors))
        parsedErrors[key] = value.join(', ');

      return parsedErrors;
    },
    
    getFirstOfParsed(parsed) {
      let entries = Object.entries(parsed);
      if (!!!entries.length)
        return null;

      let keyValue = entries[0];
      let message=  keyValue[1];

      return message;
    },

		async send(request, onFail, finnaly) {
      if (this.loading)
        return;

      this.loading = true;

      try{
        await request();
      }
      catch(error) {
        let message = null;
        let parsed = this.parseError(error);
        
        // Delegating  to callback
        if (typeof onFail === 'function') 
          message = onFail(error, parsed);

        // Or showing first of them
        else if (parsed)
          message = this.getFirstOfParsed(parsed);
          
        bus.dispatch('alert-error', {
          message
        });
      }
      finally {
        this.loading = false;
        
        if (typeof finnaly === 'function')
          finnaly();
      }
    },
	}
}

export default HandleRequests;