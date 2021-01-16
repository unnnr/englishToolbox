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

    disabled: { type: Boolean, default: false },
  },

  data() {
    return {
      removing: false
    }
  },

  methods: {
    removed() {
      this.removing = false;
    },

    resolve(target) {
      if (this.disabled || this.removing)
        return;

      let index = this.words.indexOf(target);
      if (index === -1)
        return;

      let word = this.words[index];
      this.words.splice(index, 1);
      this.$emit('resolve', word);
    }
  }
}
</script>