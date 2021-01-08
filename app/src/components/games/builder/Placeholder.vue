<template>
  <div class="builder__areas">
    <button class="builder__group-button builder__group-button--listen"></button>
    
    <div 
      ref="words"
      class="builder__group-placeholder"

      v-for="index in length"
      :key="index">
    </div>
    
    <button class="builder__group-button builder__group-button--done" disabled></button>
    
  </div>
</template>

<script>
export default {
  props: {
    length: { type: Number, default: 0}
  },
  
  inject: ['$dragger'],

  computed: {
    dragger() {
      return this.$dragger();
    }
  },

  mounted() {
    let els = this.$refs.words;

    console.log(this.$refs);
    for (let i = 0; i < els.length; i++) {
      this.dragger.addArea({
        put: this.put.bind(this, i),
        el: els[i],
      });
    }
  },

  methods: {
    put(wordIndex, el) {
      console.log(wordIndex, el)
      return true;
    }
  }
}
</script>