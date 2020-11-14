<template>
  <v-textarea 
    name="description"
    
    :value="defaultValue"
    :disabled="disabled"
    :optional="optional"
    :label="label"
    :max="180"

    v-validate/> 
</template>

<script>

import VTextarea from '@components/validation/VTextarea'

export default {
  components: { VTextarea },

  props: {
    defaultValue: { type: String, default: '' },

    label: { type: String, default: 'Post description' },

    optional: { type: Boolean, default: true },

    disabled: { type: Boolean },
  }
}
</script>