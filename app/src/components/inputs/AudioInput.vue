<template>
  <v-file
    name="audioFile"
    icon="audio"
    label="audio"
    accept="audio/*"
    v-validate/>
</template>

<script>
import VFile from '@components/validation/VFile'

export default {
  components: {
    VFile
  }
}
</script>