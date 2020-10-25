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
    request: { type: Function, default: null }
  },

  data() {
    return {
      loading: false,

      // Anchor for Linker  
      handleValidation: true,
      
      // Data sendded by linker
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
    validateInputs() {
      let allAreValid = true;

      for (let input of this.inputs)
      {
        if (!!!input.validate())
          allAreValid = false;
      }

      return allAreValid;
    },

    TEMP_showData(data) {
      for (let field of data.entries())
        console.log(field);
    },  

    collectData() {
      let data = new FormData();
      
      for (let input of this.inputs)
        input.submit(data);

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

    send(data) {
      if (this.request)
        return this.request().catch(() => false);
    },

    async submit() {
      if (!!!this.validateInputs() || !!!this.request)
        return;
      
      this.lock();

      let data = this.collectData();
      await this.send(data);

      this.unlock();
    }
  }
}
</script>

