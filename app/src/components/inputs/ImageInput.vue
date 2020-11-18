<template>
  <v-file
    name="imageFile"
    icon="image"
    label="image"
    accept="image/*"
    :optional="optional"
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
  }
}
</script>