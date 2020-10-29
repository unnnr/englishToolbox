<template>
  <div class="addition__tab description">
    <div class="addition__tab-header">
      <h6 class="heading-sixth">{{ title }}</h6>
      <button class="addition__tab-shrink-button"></button>
    </div>
    <div class="addition__tab-body description__body">
      <p class="description__text text-fourth">{{ description }}</p>
      <h6 class="heading-sixth">Tag list</h6>
      
      <post-tags 
        :main-tag="mainTag"
        :tags="tags"/>
    </div>
    <div class="addition__tab-footer">
      <time class="description__date text-fifth">{{ createdAt }}</time>
      <span class="description__views text-fifth">{{ views }}</span>
    </div>
  </div>
</template>

<script>
import PostTags from '@components/tags/PostTags'

export default {
  components: {
    PostTags
  },

  inject: [ '$target' ],

  computed: {
    target() {
      return this.$target();
    },

    title() {
      return this.target ? this.target.title : 'Something went wrong';
    },

    description() {
      return this.target ? this.target.description : `Obviously, you aren't allowed to see it, but... `;
    },

    createdAt() {
      return this.target ? this.target.createdAt : '';
    },

    views() {
      return this.target ? this.target.views : '';
    },

    tags() {
      return this.target ? this.target.tags : [];
    },

    mainTag() {
      return this.target ? this.target.mainTag : null;
    }
  }
}
</script>