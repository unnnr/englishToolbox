<template>
  <v-input
    class="input-group--code"
    placeholder="0000"
    label="Your confirmation code"
    name="code"
    
    :max="4"
    :min="4"

    v-bind="$attrs"
    v-validate/>
</template>

<script>
import VInput from '@components/validation/VInput'

export default {
  components: {
    VInput
  }
}
</script>