<template>
  <div class="search__item">
    <div 
      class="search__item-image"
      :style="{'background-image': thumbnailUrl}">
    </div>

    <h6 class="search__item-title">
      {{ title }}
    </h6>
    
    <div class="search__item-tags">
      <span 
        class="search__item-tag tag--main"
        :style="{'color': mainColor}">
        
        {{ mainLabel }}
      </span>
      
      <span 
        v-for="{id, color, label} in tags"
        :key="id"
        
        class="search__item-tag"
        :style="{'color': color}">
      
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mainTag: { type: Object, default: null },

    tags: { type: Array, default: () => [] },

    title: { type: String, default: '幹有1削母そすリぴ。' },

    thumbnail: { type: String, default: null }
  },

  computed: {
    mainLabel() {
      return this.mainTag ? this.mainTag.label : '職サセ';
    },

    mainColor() {
      return this.mainTag ? this.mainTag.color : 'darkgray';
    },

    thumbnailUrl() {
      return 'url(' + this.thumbnail + ')';
    }
  }
}
</script>