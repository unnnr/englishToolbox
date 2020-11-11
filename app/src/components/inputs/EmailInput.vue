<template>
  <v-input
    autocomplete="email"
    placeholder="some@email.com"
    label="Your email"
    icon="email"
    name="email"
    
    :validating="validating"
    :disabled="disabled"
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
    disabled: { type: Boolean },

    value: { type: String }
  },

  methods: {
    validating(data) {
      
    }
  }
}
</script>