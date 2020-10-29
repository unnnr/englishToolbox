<template>
  <v-input
    ref="input"
    
    :submitting="submitting"
    :validating="validating"

    :force-hidden="hidden"
    :disabled="optional"

    :label="label"
    :icon="icon"

    :min="min"
    :max="max"
    
    v-validate/>
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

    optional() {
      return !!!this.target;
    },

    label() {
      return 'Confirmation';
    },
  },

  watch: {
    target(current, previos) {
      if (current)
      {
        current.$on('input:shown', this.showInput);
        current.$on('input:hidden', this.hideInput);

        this.hidden = current.hidden;
      }

      if (previos)
      {
        previos.$off('input:shown', this.showInput);
        previos.$off('input:hidden', this.hideInput);
      }
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
      this.hidden = true;
    },

    validating(errors, entry) {
      if (this.target && entry !== this.target.entry)
        errors.push('Confirmation doesnt match');
    },

    submitting(data) {
      if (!!!this.target)
        return;

      let entry = this.$refs.input.entry;

      data.append(this.target.name + '_confirmation', entry);
    }
  }
}
</script>