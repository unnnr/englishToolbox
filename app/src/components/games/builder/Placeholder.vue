<template>
  <div class="builder__areas">

    <div 
      ref="words"
      class="builder__group-placeholder"

      v-for="(word, index) of placeholders"
      :key="index">

      <shrink-transition>
        <div 
          v-if="word"
          class="builder__brick"
          @click="resolve(word)">

          {{ word.text }}
        </div>
      </shrink-transition>
    </div>
    
  </div>  
</template>

<script>
import ShrinkTransition from '@components/games/builder/ShrinkTransition'

export default {
  components: {
    ShrinkTransition
  },

  props: {
    words: { type: Array, default: () => []},

    length: { type: Number, default: 0},

    disabled: { type: Boolean, default: false } 
  },

  computed: {
    placeholders() {
      let list = [];
      for (let word of this.words)
        list.push(word)

      for (let i = list.length; i < this.length; i++)
        list.push(null);

      return list;
    },

    cantComplete() {
      return this.disabled || this.words.length !== this.length;
    }
  },

  methods: {
    resolve(word) {
      if (this.disabled)
        return;

      let index = this.words.indexOf(word);
      this.words.splice(index, 1);

      this.$emit('resolve', word);
    }
  }
}
</script>

<style lang="sass">

.builder__group-placeholder
  width: auto
  min-width: 80px
  padding: 0 10px

</style>