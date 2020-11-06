<template>
  <div 
    class="card"
    :class="{'card--rectangle': rectangular}">

    <div 
      class="card__image"
      :style="{'background-image': src}"
      @click.self="select">

      <div 
        class="card__header"
        @click.self="select">

        <button class="card__favorite-button card__favorite-button--active"></button>
        <span class="card__views">{{ views }}</span>
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

    views: { type: Number, default: 0 },

    tags: { type: Array, default: () => [] },

    mainTag: { type: Object, default: null },

    rectangular: { type: Boolean, default: false }
  },

  computed: {
    src() {
      return 'url(' + this.img + ')';
    }
  },

  methods: {
    select() {
      this.$emit('select');
    }
  }
}
</script>
