<template>
  <v-input
    ref="input"

    placeholder="'Best title for my post'"
    label="Post title"
    name="title"
    
    :focusOnMount="focusOnMount"
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

    focusOnMount: { type: Boolean },
  }
}
</script>