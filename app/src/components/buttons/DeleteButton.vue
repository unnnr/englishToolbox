<template>
  <v-button 
    class="button--reddish"
    type="button"
    without-label
    v-validate/>
</template>

<script>
import VButton from '@components/validation/VButton'

export default {
  components: {
    VButton
  }
}
</script>