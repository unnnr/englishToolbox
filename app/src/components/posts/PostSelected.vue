<template>
  <section class="selected container">
    
    <transition name="fade">
      <post-selected-overlay v-if="overlayShown"/>
    </transition>

    <slot name="player"/>
    
    <post-details 
      ref="postDetails"
      :creating="creating"
      :editing="editing"
      @switching="trySwitch"> 

      <slot
        v-if="creating"
        name="creator"/>
      
      <slot 
        v-else
        name="editor"/> 

    </post-details>
  </section>
</template>

<script>
import HandleEvents from '@mixins/HandleEvents';
import PostSelectedOverlay from '@components/posts/PostSelectedOverlay'
import PostDetails from '@components/posts/PostDetails'
import bus from '@services/eventbus'

export default {
  components: {
    PostSelectedOverlay,
    PostDetails,
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
      creating: false,
      editing: false
    }
  },

  computed: {
    overlayShown() {
      return !!!this.target && !!!this.creating;
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
      'post-selecting': 
        this.wrapEvent(this.onSelecting),

      'post-editing':
        this.wrapEvent(this.onEditing),

      'post-deleting': 
        this.wrapEvent(this.postDeleting),

      'post-deleted': 
        this.postDeleted,

      'post-start-creating':  
      // Prevents alert showing if creator is already shown
      //                                         ||
      //                                         \/
      this.wrapEvent(this.onStartCreating, () => !!!this.creating),
    });
  },

  methods: {
    wrapEvent(callback, prevent) {
      function prepareCallback() {
        // default data
        let data = {
          target: {},
          editing: false,
          creating: false
        };

        callback(data, ...arguments);

        Object.assign(this, data);
      }

      return (event) => {
        if (typeof prevent === 'function' && !!!prevent())
          return;
        if (!!!this.requireWarning)
          return prepareCallback.call(this, event);

        this.showAlert(prepareCallback.bind(this, event))
      }
    },

    trySwitch(event) {
      function callback() {
        event.switch();
        _this.editing = false;
      }

      let _this = this;

      if (event.from === 'editor' && this.requireWarning)
        return this.showAlert(callback);
      
      callback();
    },
    
    scrollToTop() {
      window.scrollTo({ 
        behavior: 'smooth',
        top: 0, 
      });
    },

    postDeleted() {
      this.target = null;
    },

    postDeleting(data, event) {
      bus.dispatch('post-deleted', {
        post: event.post
      });
    },

    onSelecting(data, event) {
      bus.dispatch('post-selected', event);

      data.target = event.post;  
      Object.assign(this, data);

      this.scrollToTop();
    },

    onEditing(data, event) {
      data.target = event.post;
      data.editing = true;

      this.scrollToTop();
    },

    onStartCreating(data) {
      data.creating = true;
      bus.dispatch('post-creating');

      this.scrollToTop();
    },
    
    showAlert(callback) {
      bus.dispatch('alert-warning', { 
        message: 'You have unsaved changes. All of them will be lost',
        okay: callback
      });
    }
  }
}
</script>