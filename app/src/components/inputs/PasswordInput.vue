<template>
  <v-input
    placeholder="my_super_secret_password"
    icon="password"

    v-name="name"

    :max="64"
    :min="5"

    :force-hidden="forceHidden"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :optional="optional"
    :label="label"
    :name="name"
    
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
    
    name: { type: String, default: 'password' },

    withoutAutocomplete: { type: Boolean, default: false },

    forceHidden: { type: Boolean },

    disabled: { type: Boolean },

    optional: { type: Boolean }
  },

  computed: {
    autocomplete() {
      return this.withoutAutocomplete ? 
        'new-password' : 'current-password'
    }
  }

}
</script>