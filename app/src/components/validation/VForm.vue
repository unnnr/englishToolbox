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
    request: { type: Function, default: null },

    secondary: { type: Boolean, default: false }
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
      let allAreValid = true;

      for (let input of this.inputs)
      {
        if (typeof input.validate === 'function' && !!!input.validate())
          allAreValid = false;
      }

      return allAreValid;
    },

    TEMP_showData(data) {
      for (let [field, value] of data.entries())
        console.log(field + ': ' + value);
    },  

    collectData() {
      let data = new FormData();
      
      for (let input of this.inputs)
      {
        if (typeof input.submit === 'function')
          input.submit(data);
      }

      //
      this.TEMP_showData(data);
      // 

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

    handleError() {
      bus.dispatch('alert-error');

      for (let input of this.inputs)
      {
        if (typeof input.handleError === 'function')
          input.handleError();
      }
    },

    async send(data) {
      await this.request(data);
    },

    async submit() {
      if (!!!this.validateInputs() || !!!this.request)
        return;
      
      try {
        this.lock();

        let data = this.collectData();

        await this.send(data);
      }
      catch(error) {
        this.handleError();
      }
      finally {
        this.unlock();
      }
    }
  }
}
</script>