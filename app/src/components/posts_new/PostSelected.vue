<template>
  <section class="selected container">
    <transition name="fade">
      <post-selected-overlay v-if="overlayShown"/>
    </transition>

    <post-player>
      <slot name="player"/>
    </post-player>
    
    <post-details> 
      <slot 
        v-if="editing"
        name="editor"/>

      <slot 
        v-if="creating"
        name="creator"/>
    </post-details>
  </section>
</template>

<script>
import HandleEvents from '@mixins/HandleEvents';
import PostSelectedOverlay from '@components/posts_new/PostSelectedOverlay'
import PostDetails from '@components/posts_new/PostDetails'
import PostPlayer from '@components/posts_new/PostPlayer'

export default {
  components: {
    PostSelectedOverlay,
    PostDetails,
    PostPlayer,
  },

  mixins: [ HandleEvents ],

  provide() {
    const _this = this;

    return {
      $target: () => _this.target
    }
  },

  data() {
    return {
      target: null,

      overlayShown: false,
      editing: false,
    }
  },

  computed: {
    creating () {
      return !!!this.editing;
    }
  },

  mounted() {
    this.listen({
      'post-selecting': this.select
    });
  },

  methods: {
    select(event) {
      this.target = event.post;
    }
  }
}
</script>