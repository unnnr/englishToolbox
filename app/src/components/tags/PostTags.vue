<template>
   <div class="tags">
    <button 
      class="tag tag--main"
      type="button"

      v-if="mainTagShown"
      :style="{'background-color': mainTag.color}">

      {{ mainTag.label }}
    </button>

    <button 
      type="button" 
      class="tag"

      v-for="({label, color}, index) in tags"
      :key="index"
      
      :style="{'background-color': color}">
      
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
   props: {
    tags: { type: Array, default: () => [] },
    
    mainTag: { type: Object, default: null }
  },
  
  computed: {
    mainTagShown() {
      return this.mainTag !== null;
    }
  }
}
</script>