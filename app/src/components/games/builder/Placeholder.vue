<template>
  <div class="builder__areas">
    <button 
      class="builder__group-button builder__group-button--listen"
      :disabled="!!!loaded"
      @click="play">
    </button>

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
    
    <button 
      class="builder__group-button builder__group-button--done"
      :disabled="cantComplete"
      @click="complete">
    </button>
    
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

    audio: { type: String, default: null }, 

    length: { type: Number, default: 0},

    disabled: { type: Boolean, default: false } 
  },

  data() {
    return {
      player: null,
      loaded: false,
    }
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

  mounted() {
    this.player = new Audio(this.audio);

    this.player.addEventListener('canplaythrough', 
      () => this.loaded = true);
  },

  beforeDestroy() {
    this.player.pause();
  },

  methods: {
    play() {
      this.player.currentTime = 0;
      this.player.play();
    },

    resolve(word) {
      if (this.disabled)
        return;

      let index = this.words.indexOf(word);
      this.words.splice(index, 1);

      this.$emit('resolve', word);
    },

    complete() {
      this.$emit('complete', this.words);
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