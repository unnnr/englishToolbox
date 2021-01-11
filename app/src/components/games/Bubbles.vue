<template>
  <div class="bubbles game">
    <controls/>


    <builder/>
  </div>
</template>

<script>
import Controls from '@components/games/bubbles/Controls'
import Builder from '@components/games/bubbles/Builder'

export default {
  components: {
    Controls,
    Builder
  },

  data() {
    return {
      
    }
  },

  methods: {

  }
};
</script>
