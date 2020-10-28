<template>
  <v-input
    placeholder="some@email.com"
    label="Your email"
    icon="email"
    name="email"
    
    :validating="validating"/>
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