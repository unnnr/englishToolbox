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

    submit() {
      if (!!!this.validateInputs())
        return;

      console.log('all is correct');
      return;
      for (let input of this.inputs)
        console.log(input);
    }
  }
}
</script>

