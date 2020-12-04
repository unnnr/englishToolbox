<template>
  <v-file
    icon="audio"
    label="audio"
    accept="audio/*"
    :optional="optional"
    :name="name"
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

    optional: { type: Boolean }
  },

  methods: {
    change(data) {
      this.$emit('change', data);
    }
  }
}
</script>