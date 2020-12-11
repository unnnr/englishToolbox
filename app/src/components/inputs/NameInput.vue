<template>
  <v-input
    autocomplete="name"
    placeholder="Richard Roe"
    label="Your name"
    icon="name"
    name="name"
    
    :max="40"
    :min="3"
    
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