<template>
  <v-input
    :submitting="submitting"
    :label="label"
    :icon="icon"/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  data: function () {
    return {
      placeholder: 'aasd',
      label: 'Password confirmation',
      icon: 'password',

      min: 5,
      max: 64
    }
  },

  methods: {
    submitting(data) {
      
    }
  }
}
</script>