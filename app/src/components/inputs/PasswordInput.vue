<template>
  <v-input
    placeholder="my_super_secret_password"
    icon="password"

    :max="64"
    :min="5"

    :autocomplete="autocomplete"
    :label="label"
    :name="name"

    v-name="name"
    v-bind="$attrs"
    v-validate
    
    visibility-buttoned/>
</template>

<script>
import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  props: {
    label: { type: String, default: 'Your password' },
    
    name: { type: String, default: 'password' },

    withoutAutocomplete: { type: Boolean, default: false },
  },

  computed: {
    autocomplete() {
      return this.withoutAutocomplete ? 
        'new-password' : 'current-password'
    }
  }

}
</script>