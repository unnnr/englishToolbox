<template>
  <v-input
    placeholder="http://some.link.su"
    label="Yout link"
    name="link"
    
    :value="defaultValue"

    :max="64"
    :min="3"

    v-validate/>
</template>

<script>
import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },

  props: {
    defaultValue: { type: String, default: '' },
  }
}
</script>