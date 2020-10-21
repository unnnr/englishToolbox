<template>
  <v-input
    v-name="'password'"
    v-validate
    
    :submitting="submitting"
    :label="label"
    :icon="icon"
    :min="min"
    :max="max"
    visibility-buttoned/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  data: function () {
    return {
      placeholder: 'some placeholder',
      label: 'Your password',
      icon: 'password',

      min: 5,
      max: 64
    }
  },

  methods: {
    submitting() {
      
    }
  }
}
</script>