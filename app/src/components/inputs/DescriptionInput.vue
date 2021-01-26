<template>
  <v-textarea 
    :value="defaultValue"
    :name="name"

    :optional="optional"    
    :label="label"
    :max="max"

    v-bind="$attrs"
    v-validate/> 
</template>

<script>
import VTextarea from '@components/validation/VTextarea'

export default {
  components: { VTextarea },

  props: {
    required: { type: Boolean, default: false },
    
    defaultValue: { type: String, default: '' },

    label: { type: String, default: 'Post description' },

    name: { type: String, default: 'description'},

    max: { type: Number, default: 180 },
  },

  computed: {
    optional() {
      return !!!this.required;
    }
  }
}
</script>e