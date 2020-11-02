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
      @switching="trySwitch"> 

      <slot v-if="creating" name="creator"/>
      
      <slot v-if="editing" name="editor"/> 

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
    editorHasChanges: { type: Function },

    creatorHasChanges: { type: Function },
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
    editing () {
      return !!!this.creating;
    },
    
    requireWarning: {
      get() { 
        if (this.editing && this.editorHasChanges)
          return this.editorHasChanges();

        if (this.creating && this.creatorHasChanges)
          return this.creatorHasChanges();

        return false;
      },

      cache: false
    }
  },

  mounted() {
    this.listen({
      'post-selecting': (event) => {
        if (this.requireWarning) {
          this.showAlert(this.onSelecting.bind(this, event));

          return;
        }

        this.onSelecting(event);
      },

      'post-start-creating': () => {
        if (this.requireWarning) {
          this.showAlert(this.onCreating)

          return;
        }
        
        this.onCreating();
        bus.dispatch('post-creating');
      }
    });
  },

  methods: {
    trySwitch(event) {
      if (event.from === 'editor' && this.requireWarning)
        return this.showAlert(event.switch);

      event.switch();
    },

    onSelecting(event) {
      bus.dispatch('post-selected', event);

      this.creating = false;
      this.target = event.post;  
      
      // Switching tab to 'Post info'
      if (this.$refs.postDetails)
        this.$refs.postDetails.select('info')
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