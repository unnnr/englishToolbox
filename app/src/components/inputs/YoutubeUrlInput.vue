<template>
  <v-input
    placeholder="https://youtube.com/..."
    label="Youtube link"
    @validating="validating"
    v-validate/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  methods: {
    validating(data) {
      
    }
  }
}
</script>