<template>
   <div class="card__tags">
    <div 
      class="card__tag tag tag--circle"

      v-for="({color}, index) in tags"
      :key="index"
      
      :style="{'background-color': color}">
    </div>

    <button 
      class="card__tag-main tag tag--main"
      
      v-if="mainTagShown"
      :style="{'background-color': mainTag.color}">>
      
      {{ mainTag.label }} 
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