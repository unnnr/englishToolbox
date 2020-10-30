<template>
  <v-button 
    class="button--reddish"
    v-validate
    without-label/>
</template>

<script>
import VButton from '@components/validation/VButton'

export default {
  components: {
    VButton
  }
}
</script>