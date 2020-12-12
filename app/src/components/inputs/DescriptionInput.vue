<template>
  <v-textarea 
    :value="defaultValue"
    :name="name"

    :optional="optional"    
    :label="label"
    :max="180"

    v-bind="$attrs"
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
  },

  computed: {
    optional() {
      return !!!this.required;
    }
  }
}
</script>e