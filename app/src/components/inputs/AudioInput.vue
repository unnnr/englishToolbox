<template>
  <v-file
    icon="audio"
    label="audio"
    accept="audio/*"
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
    name: { type: String, default: 'audio' },
  },

  methods: {
    change(data) {
      this.$emit('change', data);
    }
  }
}
</script>