<template>
  <v-input
    autocomplete="email"
    placeholder="some@email.com"
    label="Your email"
    icon="email"
    name="email"
    
    :validating="validating"
    :optional="optional"
    :disabled="disabled"
    :focusOnMount="focusOnMount"
    :value="value"
    v-validate/>
</template>

<script>
import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  props: {
    value: { type: String },

    disabled: { type: Boolean },

    optional: { type: Boolean },

    focusOnMount: { type: Boolean },
  },

  methods: {
    validating(errors, entry) {
      let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      
      if (regex.test(entry))
        return;

      errors.push('Email has invalid format');
    }
  }
}
</script>