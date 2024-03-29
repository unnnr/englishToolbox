<template>
  <form 
    ref="form"
    @submit.prevent="submit">

    <slot/>
  </form>
</template>

<script>
export default {
  props: {
    catch: { type: Function, default: null },

    request: { type: Function, default: null },

    secondary: { type: Boolean, default: false },

    requirePassword: { type: Boolean, default: false },

    preventRedundant: { type: Boolean, default: true }
  },

  data() {
    return {
      loading: false,

      // Anchor for Linker  
      handleValidation: true,
      
      // Data setted by linker
      inputs: [],
      anchors: {},
      watchers: {}
    }
  },

  provide() {
    return {
      secondary: this.secondary,
    }
  },

  methods: {
    reset() {
      for (let input of this.inputs) {
        if (typeof input.reset === 'function')
          input.reset()
      }
    },

    hasChanges() {
      for (let input of this.inputs)
      {
        if (typeof input.hasChanges === 'function'
            && input.hasChanges())
          return true;
      }

      return false;
    },

    validateInputs() {
      let allValid = true;

      for (let input of this.inputs) {
        if (typeof input.validate === 'function' && !!!input.validate())
          allValid = false;
      }

      return allValid;
    },

    collectData() {
      let data = new FormData();
      
      for (let input of this.inputs) {
        if (typeof input.submit === 'function')
          input.submit(data);
      }

      return data;
    },


    lock() {
      this.loading = true;

      for (let input of this.inputs)
        input.loading = true;
    },

    unlock() {
      for (let input of this.inputs)
        input.loading = false;
      
      this.loading = false;
    },

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

    handleError(data) {
      let error = this.parseError(data);

      if (this.catch)
        this.catch(error);

      for (let input of this.inputs) {
        if (typeof input.handleError === 'function')
          input.handleError(error);
      }

      if (data.status !== 422) {
        bus.dispatch('alert-error', {
          message: data.body ? data.body.message : ''
        });
        return;
      }
    },

    appendPassword(callback) {
      bus.dispatch('alert-prompt', {
        confirm: (entry) => callback(entry)
      });
    },

    async sendWith(callback) {
      if (this.loading)
        return;
         
      try {
        this.lock();
        await callback();
      }
      catch(error) {
        this.handleError(error);
      }
      finally {
        this.unlock();
      }
    },

    async submit() {
      if (!!!this.validateInputs() || !!!this.request)
        return;

      let hasChanges = this.hasChanges();
      if (this.preventRedundant && !!!hasChanges)
        return;

      if (hasChanges && this.requirePassword) {
        this.appendPassword(password => {
          this.sendWith(() => {
            let data = this.collectData();
            data.append('password', password);
            return this.request(data, hasChanges);
          });
        });
        return;
      }

      this.sendWith(() => {
        let data = this.collectData();
        return this.request(data, hasChanges);
      });
    }
  }
}
</script>