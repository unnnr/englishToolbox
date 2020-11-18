<template>
  <v-file
    name="image"
    icon="image"
    label="image"
    accept="image/*"/>
</template>

<script>
import VFile from '@components/validation/VFile'

export default {
  components: {
    VFile
  }
}
</script>