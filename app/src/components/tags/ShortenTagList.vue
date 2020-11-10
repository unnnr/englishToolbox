<template>
   <div class="card__tags">
 <!--    <div 
      class="card__tag tag tag--circle"

      v-for="({color}, index) in tags"
      :key="index"
      
      :style="{'background-color': color}">
    </div> -->

<!--     <button 
      class="card__tag-main tag tag--main"
      
      v-if="mainTagShown"
      :style="{'background-color': mainTag.color}">>
      
      {{ mainTag.label }} 
    </button>
 -->

    <tag
      class="card__tag"

      v-for="({color, label}, index) in tags"
      :key="index"
      
      v-tooltip="label"
      :color="color"
      circled
      />

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