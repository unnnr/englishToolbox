<template>
   <div class="card__tags">
    <tag
      class="card__tag"

      v-for="({color, label}, index) in tags"
      :key="index"
      
      v-tooltip="label"
      :color="color"
      circled/>

    <tag
      v-if="mainTagShown"

      class="card__tag-main"
      :color="mainTag.color"
      :label="mainTag.label"

      main/>
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