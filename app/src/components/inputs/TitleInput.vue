<template>
  <v-input
    name="title"
    
    :optional="optional"
    :disabled="disabled"

    :value="value"
    :label="label"
    
    :max="64"
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
    label: {type: String, default: 'Title' },

    value: { type: String },

    optional: { type: Boolean },

    disabled: { type: Boolean },
  }
}
</script>