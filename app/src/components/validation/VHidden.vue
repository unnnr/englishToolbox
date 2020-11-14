<template>
  <input type="hidden"/>
</template>

<script>
export default {
  props: {
    hasChanges: { type: Function },

    handleError: { type: Function },

    validate: { type: Function },

    submit: { type: Function },
    
    reset: { type: Function },
  },

  data() {
    return {
      loading: false
    }
  }
}
</script>