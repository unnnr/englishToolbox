<template>
  <v-input
    placeholder="Some placeholder"
    label="Your passowrd"
    icon="password"
    name="password"

    v-name="'password'"

    :max="64"
    :min="5"

    :force-hidden="forceHidden"
    :disabled="disabled"
    
    visibility-buttoned
    v-validate/>
</template>

<script>

import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  props: {
    disabled: { type: Boolean, default:false },

    forceHidden: { type: Boolean, default: false },
  }
}
</script>