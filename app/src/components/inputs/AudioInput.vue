<template>
  <v-file
    name="audioFile"
    icon="audio"
    label="audio"
    accept="audio/*"
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