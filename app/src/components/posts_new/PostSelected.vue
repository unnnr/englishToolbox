<template>
  <section class="selected container">
    <transition name="fade">
      <post-selected-overlay v-if="overlayShown"/>
    </transition>

    <post-player>
      <slot name="player"/>
    </post-player>
    
    <post-details 
      :only-editor="creating"> 
      
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
      creating: false,
    }
  },

  computed: {
    editing () {
      return !!!this.creating;
    }
  },

  mounted() {
    this.listen({
      'post-selecting': (event) => {
        this.target = event.post;
        this.creating = false;
      },

      'post-creating': () => {
        this.target = null;
        this.creating = true;
      }
    });
  },

  methods: {
    select(event) {
      this.target = event.post;
      this.creating = false;
    }
  }
}
</script>