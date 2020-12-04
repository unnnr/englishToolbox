<template>
  <v-file
    icon="image"
    label="image"
    accept="image/png,image/jpeg,image/webp,image/gif"
    :name="name"
    :optional="optional"
    @change="change"
    v-validate/>
</template>

<script>
import VFile from '@components/validation/VFile'

export default {
  components: {
    VFile
  },

  props: {
    name: { type: String, default: 'image' },

    optional: { type: Boolean },
  },

  methods: {
    change(data) {
      this.$emit('change', data);
    }
  }
}
</script>