<template>
  <v-textarea 
    :value="defaultValue"
    :name="name"

    :disabled="disabled"
    :optional="optional"
    :autoGrow="autoGrow"
    
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

    name: { type: String, default: 'description'},

    required: { type: Boolean, default: false },

    autoGrow: { type: Boolean, type: true },

    disabled: { type: Boolean },
  },

  computed: {
    optional() {
      return !!!this.required;
    }
  }
}
</script>e