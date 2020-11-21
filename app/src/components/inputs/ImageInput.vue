<template>
  <v-file
    name="imageFile"
    icon="image"
    label="image"
    accept="image/*"
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
    optional: { type: Boolean }
  },

  methods: {
    change(data) {
      this.$emit('change', data);
    }
  }
}
</script>