<template>
  <button
    type="submit"
    :class="{
      'button-secondary': secondary,
      'button-primary': primary,
      'button--loading': spinerShown
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

    withoutLabel: { type: Boolean, default: false },

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

    spinerShown() {
      return this.loading && !!!this.withoutLabel;
    },

    label() {
      if (this.withoutLabel)
        return;
        
      if (this.loading)
        return 'Loading';

      return this.mesasge;
    }
  }
}
</script>