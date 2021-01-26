<template>
  <v-input
    placeholder="https://some.link.su"
    label="Your link"
    name="link"
    
    :value="defaultValue"
    :max="100"

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