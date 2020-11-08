<template>
   <div class="tags">
    <!-- <button 
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
    </button> -->
    
    <tag
      v-if="mainTagShown"

      :color="mainTag.color"
      :label="mainTag.label"
      main/>

    <tag
      v-for="({label, color}, index) in tags"
      :key="index"

      :color="color"
      :label="label"/>
    
  </div>
</template>

<script>
import Tag from '@components/tags/Tag'

export default {
  components: {
    Tag
  },

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