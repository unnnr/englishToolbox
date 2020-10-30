<template>
  <v-input
    placeholder="https://youtube.com/..."
    label="Youtube link"
    name="videoUrl"

    :value="value"
    v-validate

    @validating="validating"/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  props: {
    value: { type: String, default: '' }
  },

  methods: {
    validating(data) {
      
    }
  }
}
</script>