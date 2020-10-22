<template>
  <form 
    ref="form"
    @submit.prevent="submit">

    <slot/>
  </form>
</template>

<script>
export default {
  data() {
    return {
      handleValidation: true,
      inputs: [],
      anchors: {},
      watchers: {}
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

    submit() {
      if (!!!this.validateInputs())
        return;

      let data = new FormData();
      
      for (let input of this.inputs)
        input.submit(data);

      this.TEMP_showData(data);
    }
  }
}
</script>

