<template>
  <v-input
    placeholder="Brikys"
    label="Your name"
    icon="name"
    
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
    disabled: { type: Boolean },

    value: { type: String }
  },

  methods: {
    validating(data) {
      
    }
  }
}
</script>