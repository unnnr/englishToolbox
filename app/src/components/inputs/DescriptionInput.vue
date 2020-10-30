<template>
  <v-textarea 
    label="Post description"
    name="description"
    
    :value="value"
    :disabled="disabled"
    :optional="optional"
    :max="180"

    v-validate/> 
</template>

<script>

import VTextarea from '@components/validation/VTextarea'

export default {
  components: { VTextarea },

  props: {
    optional: { type: Boolean, default: true },

    value: { type: String, default: '' },

    disabled: { type: Boolean, default: false },
  }
}
</script>