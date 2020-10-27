<template>
  <section class="selected container">

    <post-selected-overlay v-if="overlayShown"/>

    <post-player>
      <slot name="player"/>
    </post-player>

    <post-details> 
      <slot name="editor"/>
    </post-details>

  </section>
</template>

<script>

import PostSelectedOverlay from '@components/posts_new/PostSelectedOverlay'
import PostDetails from '@components/posts_new/PostDetails'
import PostPlayer from '@components/posts_new/PostPlayer'

export default {
  components: {
    PostSelectedOverlay,
    PostDetails,
    PostPlayer
  },

  data() {
    return {
      target: null
    }
  },

  provide() {
    const _this = this;

    return {
      $target: () => _this.target
    }
  },

  computed: {
    overlayShown() {
      return false;
    }
  }
}
</script>