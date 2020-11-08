<template>
   <div class="tags">
    
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