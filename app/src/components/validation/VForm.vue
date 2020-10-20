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
    submit() {
      
    }
  }
}
</script>

