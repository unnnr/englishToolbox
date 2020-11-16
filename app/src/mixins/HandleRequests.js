import bus from '@services/eventbus'

const HandleRequests = {
	data() {
		return {
			loading: false,
		}
	},
	
	methods: {
		async send(request, onFail) {
      if (this.loading)
        return;

      this.loading = true;

      try{
        await request();
      }
      catch(error) {
        let message = null;

        if (typeof onFail === 'function')
          message = onFail(error);

        console.error(error);

        bus.dispatch('alert-error', {
          message
        });
      }
      finally {
        this.loading = false;
      }
    },
	}
}

export default HandleRequests;