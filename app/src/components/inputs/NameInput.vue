<template>
  <v-input
    placeholder="Brikys"
    label="Your name"
    icon="name"
    
    :disabled="disabled"
    :max="40"
    :min="3"
    v-validate/>
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