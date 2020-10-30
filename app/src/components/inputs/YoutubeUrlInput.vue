<template>
  <v-input
    placeholder="https://youtube.com/..."
    label="Youtube link"
    :value="value"
    @validating="validating"
    v-validate/>
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