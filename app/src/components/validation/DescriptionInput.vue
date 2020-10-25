<template>
  <v-textarea 
    placeholder="Some placeholder"
    label="Post description"
    name="description"
    
    :disabled="disabled"
    :max="123"

    v-validate/> 
</template>

<script>

import VTextarea from '@components/validation/VTextarea'

export default {
  components: { VTextarea },

  props: {
    disabled: { type: Boolean, default:false },
  }
}
</script>