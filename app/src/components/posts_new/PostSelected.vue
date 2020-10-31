<template>
  <section class="selected container">
    <transition name="fade">
      <post-selected-overlay v-if="overlayShown"/>
    </transition>

    <post-player>
      <slot name="player"/>
    </post-player>
    
    <post-details 
      ref="postDetails"
      :only-editor="creating"
      :editor-component="currentComponent"> 
      
     <!--  <slot 
        v-if="editing"
        name='editor'/>

      <slot 
        v-if="creating"
        name="creator"/> -->
    </post-details>
  </section>
</template>

<script>
import HandleEvents from '@mixins/HandleEvents';
import PostSelectedOverlay from '@components/posts_new/PostSelectedOverlay'
import PostDetails from '@components/posts_new/PostDetails'
import PostPlayer from '@components/posts_new/PostPlayer'
import bus from '@services/eventbus'

export default {
  components: {
    PostSelectedOverlay,
    PostDetails,
    PostPlayer,
  },

  mixins: [ HandleEvents ],

  props: {
    editorComponent: { type: Object },

    creatorComponent: { type: Object }
  },

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
    currentComponent() {
      return this.editing ?
        this.editorComponent : 
        this.creatorComponent;
    },

    requireWarning:{ 
      get() {
        let postDetails = this.$refs.postDetails;

        return postDetails.requireWarning
      },

      cache:false
    },
  

    editing () {
      return !!!this.creating;
    }
  },

  mounted() {
    this.listen({
      'post-selecting': (event) => {
        if (!!!this.requireWarning)
          return this.onSelecting(event);

        this.showAlert(() =>
          this.onSelecting(event)
        );
        
      },

      'post-creating': () => {
        if (this.requireWarning)
          return this.showAlert(this.onCreating);
        
        this.onCreating();
      }
    });
  },

  methods: {
    onSelecting(event) {
      bus.dispatch('post-selected', event);

      this.creating = false;
      this.target = event.post;  
    },

    onCreating(){
      this.target = null;
      this.creating = true;
    },
    
    showAlert(callback) {
      bus.dispatch('alert-warning', { 
        message: 'You have unsaved changes. All of them will be lost',
        okay: callback
      });
    },

    select(event) {
      this.target = event.post;
      this.creating = false;
    }
  }
}
</script>