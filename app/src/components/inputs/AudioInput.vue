<template>
  <v-file
    name="audio"
    icon="audio"
    label="audio"
    accept="audio/*"/>
</template>

<script>
import VFile from '@components/validation/VFile'

export default {
  components: {
    VFile
  }
}
</script>