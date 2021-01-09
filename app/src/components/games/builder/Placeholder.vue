<template>
  <div class="builder__areas">
    <button class="builder__group-button builder__group-button--listen"></button>
    
    <div 
      ref="words"
      class="builder__group-placeholder"

      v-for="(word, index) in words"
      :key="index">
    </div>
    
    <button class="builder__group-button builder__group-button--done" disabled>
    </button>
    
  </div>
</template>

<script>
export default {
  props: {
    words: { type: Array, default: () => []}
  },

  methods: {
   
  }
}
</script>