<template>
  <v-button
    v-validate
    v-bind="$attrs"/>
</template>

<script>
import VButton from '@components/validation/VButton'

export default {
  components: {
    VButton
  }
}
</script>