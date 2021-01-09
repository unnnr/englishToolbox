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
        class="builder__brick">
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
  }
}
</script>