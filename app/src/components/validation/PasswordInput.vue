<template>
  <v-input
    v-name="'password'"
    v-validate
    
    :label="label"
    :icon="icon"
    :name="name"

    :min="min"
    :max="max"

    :optional="optional"
    :secondary="secondary"
    :force-hidden="forceHidden"
    
    visibility-buttoned/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  props: {
    optional: { type: Boolean, default: false },

    // disabled: { type: Boolean, default:false },

    secondary: {type: Boolean, default: false},

    forceHidden: { type: Boolean, default: false },
  },

  data() {
    return {
      placeholder: 'some placeholder',
      label: 'Your password',
      icon: 'password',
      name: 'password',

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