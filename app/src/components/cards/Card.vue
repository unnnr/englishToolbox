<template>
  <div 
    class="card"
    :class="{
      'card--rectangle': rectangular,
      'card--selected': selected}">

    <div 
      class="card__image"
      :style="{'background-image': src}"
      v-context:items="context"
      @click.self="select">

      <div 
        class="card__header"
        @click.self="select">

        <button 
          v-if="favoriteShown"
          class="card__favorite-button"
          :class="{'card__favorite-button--active': favorite}"
          @click="favoriteToggle">
        </button>

        <span 
          v-if="viewsShown"
          class="card__views">
          
          {{ views }}
        </span>

      </div>
      <div class="card__title">
        <h6 class="heading-sixth">{{ title }}</h6>
      </div>
    </div>

    <div class="card__text">
      <p class="text-third">{{ description }}</p>
    </div>
    <div class="card__footer">
        <shorten-tag-list
          :main-tag="mainTag"
          :tags="tags"/>

        <time class="card__date">{{ createdAt }}</time>
    </div>
  </div>
</template>

<script>
import ShortenTagList from '@components/tags/ShortenTagList'

export default {
  components: {
    ShortenTagList
  },

  props: {
    img: { type: String, default: '' },

    title: { type: String, default: '' },

    createdAt: { type: String, default: '' },

    description: { type: String, default: '' },

    views: { type: Number, default: null },

    tags: { type: Array, default: () => [] },

    mainTag: { type: Object, default: null },

    context: { type: Function, default: null },

    video: { tpye: Boolean, default: false},

    favorite: { type: Boolean, default: null },

    selected: { type: Boolean, default: false },

    rectangular: { type: Boolean, default: false },
  },

  computed: {
    src() {
      return 'url(' + this.img + ')';
    },

    viewsShown() {
      return this.views !== null;
    },

    favoriteShown() {
      return this.favorite !== null;
    },
  },

  methods: {
    select() {
      this.$emit('select');
    },

    favoriteToggle() {
      this.$emit('favorite-toggle');
    }
  }
}
</script>