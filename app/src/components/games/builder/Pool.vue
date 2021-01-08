<template>
  <div class="builder__pool">

    <word 
      v-for="(word, index) in words"
      :key="index"

      :text="word"
      @drag="(options) => drag(index, options)"/>

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
  },

  inject: ['$dragger'],

  computed: {
    dragger() {
      return this.$dragger();
    }
  },

  mounted() {
    this.dragger.remove = this.put.bind(this);
  },

  methods: {
    remove(index) {
      this.words.splice(index, 1);
    },

    drag(index, options) {
      let {target, event} = options;

      this.remove(index);
      this.dragger.drag(target, event);
    },

    put(target) {
      target.el.remove();
      this.words.push(target.word)
    }
  }
}
</script>