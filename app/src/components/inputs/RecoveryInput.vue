<template>
  <v-input
    class="input-group--code"
    placeholder="0000"
    label="Your confirmation code"
    name="code"
    
    :disabled="disabled"
    :focusOnMount="focusOnMount"
    
    :max="4"
    :min="4"
    v-validate/>
</template>

<script>
import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  },
  
  props: {
    disabled: { type: Boolean },

    focusOnMount: { type: Boolean },
  },

  methods: {
    validating(data) {
      
    }
  }
}
</script>