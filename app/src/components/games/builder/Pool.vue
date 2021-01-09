<template>
  <shrink-transition 
    class="builder__pool"
    group>

    <div 
      v-for="word in words"
      :key="word.key"

      class="builder__brick"
      ref="words"

      @click="resolve(word)">

      {{ word.text }}
    </div>

  </shrink-transition>
</template>

<script>
import ShrinkTransition from '@components/games/builder/ShrinkTransition'

export default {
  components: {
    ShrinkTransition,
  },

  props: {
    words: { type: Array, default: () => [] },
  },

  methods: {
    resolve(target) {
      let index = this.words.indexOf(target);
      let word = this.words[index];
      this.words.splice(index, 1);

      this.$emit('resolve', word);
    }
  }
}
</script>