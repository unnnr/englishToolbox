<template>
  <v-input
    ref="input"

    placeholder="'Best title for my post'"
    label="Post title"
    name="title"

    :value="defaultValue"

    :focusOnMount="focusOnMount"
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