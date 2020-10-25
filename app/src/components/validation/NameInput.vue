<template>
  <v-input
    placeholder="Brikys"
    label="Your name"
    icon="profile"
    
    :max="40"
    :min="3"/>
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