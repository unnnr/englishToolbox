<template>
  <button
    type="submit"
    :class="{
      'button-secondary': secondary,
      'button-primary': primary,
      'button--loading': loading
      }"
    :disabled="disabled || loading">
    
    {{ label }}
  </button>
</template>

<script>
export default {
  inject: ['secondary'],
  
  props: {
    mesasge: { type: String, default: 'Confirm'},

    disabled: { type: Boolean, default: false },
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    primary() {
      return !!!this.secondary;
    },

    label() {
      if (this.loading)
        return 'Loading';

      return this.mesasge;
    }
  }
}
</script>