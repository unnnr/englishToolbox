<template>
  <v-input
    placeholder="some@email.com"
    label="Your email"
    icon="email"
    name="email"
    
    :validating="validating"
    :disabled="disabled"/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  props: {
    disabled: { type: Boolean, default: false}
  },

  methods: {
    validating(data) {
      
    }
  }
}
</script>