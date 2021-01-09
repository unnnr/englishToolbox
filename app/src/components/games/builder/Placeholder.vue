<template>
  <div class="builder__areas">
    <button class="builder__group-button builder__group-button--listen"></button>
    
    <div 
      ref="words"
      class="builder__group-placeholder"

      v-for="(word, index) of placeholders"
      :key="index">

      <div 
        v-if="word"
        class="builder__brick"
        @click="resolve(word)">
        {{ word.text }}
      </div>
    </div>
    
    <button class="builder__group-button builder__group-button--done" disabled>
    </button>
    
  </div>
</template>

<script>
export default {
  props: {
    words: { type: Array, default: () => []},

    length: { type: Number, default: () => []}
  },

  computed: {
    placeholders() {
      let list = [];
      for (let word of this.words)
        list.push(word)

      for (let i = list.length; i <= this.length; i++)
        list.push(null);

      return list;
    }
  },

  methods: {
    resolve(word) {
      let index = this.words.indexOf(word);
      this.words.splice(index, 1);

      this.$emit('resolve', word);
    }
  }
}
</script>