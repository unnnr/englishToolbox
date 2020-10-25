<template>
  <v-input
    placeholder="some@email.com"
    label="Your email"
    icon="email"
    
    :validating="validating"/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  data: function () {
    return {
      placeholder: 'some@email.com',
      label: 'Your email',
      icon: 'email',

      min: 5,
      max: 64
    }
  },

  methods: {
    validating(data) {
      
    }
  }
}
</script>