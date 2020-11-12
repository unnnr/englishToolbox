<template>
  <v-input
    autocomplete="name"
    placeholder="Brikys"
    label="Your name"
    icon="name"
    name="name"
    
    :optional="optional"
    :disabled="disabled"
    :value="value"
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
    optional: { type: Boolean },

    disabled: { type: Boolean },

    value: { type: String }
  },

  methods: {
    validating(data) {
      
    }
  }
}
</script>