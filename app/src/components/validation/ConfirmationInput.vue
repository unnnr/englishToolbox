<template>
  <v-input
    v-validate
    :submitting="submitting"
    :label="label"
    :icon="icon"
    :min="min"
    :max="max"
    :force-hidden="hidden"/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  data() {
    return {
      target: null,
      hidden: false
    }
  },

  computed: {
    placeholder() {
      return this.target ? this.target.placeholder : null;
    },

    icon() {
      return this.target ? this.target.icon : null
    },

    min() {
      return this.target ? this.target.min : null;
    },

    max() {
      return this.target ? this.target.max : null;
    },

    label() {
      return 'Confirmation';
    },
  },

  watch: {
    target(current, previos) {
      current.$on('input:shown', this.showInput);
      current.$on('input:hidden', this.hideInput);

      this.hidden = current.hidden;

      if (!!!previos)
        return;

      previos.$off('input:shown', this.showInput);
      previos.$off('input:hidden', this.hideInput);
    },
  },

  beforeDestroy() {
    if (!!!this.target)
        return;

    this.target.$off('input:shown', this.showInput);
    this.target.$off('input:hidden', this.hideInput);
  },

  methods: {
    showInput() {
      this.hidden = false;
    },

    hideInput() {
      console.log(2);

      this.hidden = true;
    },

    submitting() {
      
    }
  }
}
</script>