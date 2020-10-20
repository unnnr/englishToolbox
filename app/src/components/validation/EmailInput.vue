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
      placeholder: 'some@email.com',
      label: 'Your email',
      icon: 'email',

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