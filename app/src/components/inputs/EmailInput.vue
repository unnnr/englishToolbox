<template>
  <v-input
    autocomplete="email"
    placeholder="some@email.com"
    label="Your email"
    icon="email"
    name="email"

    v-bind="$attrs"
    
    :validating="validating"
    v-validate/>
</template>

<script>
import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
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