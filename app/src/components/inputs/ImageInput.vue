<template>
  <v-file
    icon="image"
    label="image"
    accept="image/png,image/jpeg,image/webp,image/gif"
    :name="name"
    
    v-bind="$arrts"
    v-validate
    
    @change="change"/>
</template>

<script>
import VFile from '@components/validation/VFile'

export default {
  components: {
    VFile
  },

  props: {
    name: { type: String, default: 'image' },
  },

  methods: {
    change(data) {
      this.$emit('change', data);
    }
  }
}
</script>