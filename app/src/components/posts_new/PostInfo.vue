<template>
  <div 
    class="addition__tab description"
    :class="{'description--shrinked': shrinked}">

    <div class="addition__tab-header">
      <h6 class="heading-sixth">{{ title }}</h6>

      <shrink-button 
        class="addition__tab-shrink-button"
        :shrinked="shrinked"
        @click.native="toggle">
      </shrink-button>
    </div>
    
    <shrinkable 
      ref="shrinkable"
      :inner-class="['addition__tab-body', 'description__body']"
      :shrinked-by-default="mobile">
      
      <p class="description__text text-fourth">{{ description }}</p>
      <h6 class="heading-sixth">Tag list</h6>
      
      <tag-list 
        :main-tag="mainTag"
        :tags="tags"/>
    </shrinkable>

    <div class="addition__tab-footer">
      <time class="description__date text-fifth">{{ createdAt }}</time>
      <span class="description__views text-fifth">{{ views }}</span>
    </div>
  </div>
</template>

<script>
import Shrinkable from '@mixins/Shrinkable'
import TagList from '@components/tags/TagList'

export default {
  components: {
    TagList
  },

  mixins: [ Shrinkable ],

  inject: [ '$target' ],

  computed: {
    target() {
      return this.$target();
    },

    title() {
      return this.target ? this.target.title : 
        'Something went wrong';
    },

    description() {
      return this.target ? this.target.description : 
        `Obviously, you aren't allowed to see it, but... `;
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

<style lang="sass" scoped>

.description
  transition: gap .3s

.description--shrinked 
  gap: 7.5px


/*  or :not(.shrinkable--closed).description__body */
.shrinkable--opened,
.shrinkable--opening,
.shrinkable--closing
  overflow-y: auto

</style>
