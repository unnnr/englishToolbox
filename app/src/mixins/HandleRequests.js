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

		async send(request, onFail, finnaly) {
      if (this.loading)
        return;

      this.loading = true;

      try{
        await request();
      }
      catch(error) {
        let message = null;

        if (typeof onFail === 'function')
          message = onFail(error, this.parseError(error));

        console.error(error);

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