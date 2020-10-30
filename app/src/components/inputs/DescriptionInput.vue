<template>
  <v-textarea 
    placeholder="Some placeholder"
    label="Post description"
    name="description"
    
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

    disabled: { type: Boolean, default: false },
  }
}
</script>