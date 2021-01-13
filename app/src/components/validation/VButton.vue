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
    <span
      :style="{'background-image': spinerUrl}">
    </span>
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
      loading: false,
      spiner: window.origin + '/img/svg/spinner.svg'
    }
  },

  computed: {
    primary() {
      return !!!this.secondary;
    },

    spinerUrl() {
      return this.spinerShown ? 'url("'+ this.spiner +'")' : null;
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