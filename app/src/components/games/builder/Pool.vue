<template>
  <div class="builder__pool">

    <word 
      :text="'nWord'"
      @drag="drag"/>

  </div>
</template>

<script>
import Word from '@components/games/builder/Word'

export default {
  components: {
    Word
  },
  
  props: {
    words: { type: Array, default: () => [] }
  }
}
</script>