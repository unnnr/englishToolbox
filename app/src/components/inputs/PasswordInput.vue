<template>
  <v-input
    placeholder="Some placeholder"
    icon="password"
    name="password"

    v-name="'password'"

    :max="64"
    :min="5"

    :force-hidden="forceHidden"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :label="label"
    
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
    label: { type: String, default: 'Your passowrd' },

    withoutAutocomplete: { type: Boolean, default: false },

    disabled: { type: Boolean },

    forceHidden: { type: Boolean },
  },

  computed: {
    autocomplete() {
      return this.withoutAutocomplete ? 
        'new-password' : 'current-password'
    }
  }

}
</script>