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
    drag({target, event}) {
      this.dragger.drag(target, event);
    },

    put(el) {
      console.log(el);
    }
  }
}
</script>