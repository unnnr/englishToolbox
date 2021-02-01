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
// services
import Views from '@models/Views'
import bus from '@services/eventbus'

// mixins
import HandleTagsDeletion from '@mixins/HandleTagsDeletion';
import HandleEvents from '@mixins/HandleEvents';

// components
import PostSelectedOverlay from '@components/posts/PostSelectedOverlay'
import PostDetails from '@components/posts/PostDetails'


export default {
  components: {
    PostSelectedOverlay,
    PostDetails,
  },

  mixins: [ 
    HandleTagsDeletion,
    HandleEvents
  ],

  inject: ['model'],

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
        this.wrapEvent(this.postDeleted),

      'post-start-creating':  
      // Prevents alert appearing if creator is already shown
      //                                         ||
      //                                         \/
      this.wrapEvent(this.onStartCreating, () => !!!this.creating),

      'tag-deleted': 
        this.onTagDeleted,
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

        if (event.withoutAlert || !!!this.requireWarning)
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

    showAlert(callback) {
      bus.dispatch('alert-warning', { 
        message: 'You have unsaved changes. All of them will be lost',
        okay: callback
      });
    },

    async updateViews() {
      let model = this.model;
      let id = this.target.id;

      let updated = await Views.update(model, id);
      if (!!!updated)
        return;
      
      let value = this.target.views + 1;
      this.$set(this.target, 'views', value);
    },

    // Events

    postDeleted() {
      this.target = null;
    },

    postDeleting(data, event) {
      bus.dispatch('post-deleted', {
        post: event.post
      });
    },

    onSelecting($this, event) {
      bus.dispatch('post-selected', event);
      
      $this.target = event.post;
      Object.assign(this, $this);

      if (!!!this.target)
        return;

      this.scrollToTop();
      this.updateViews();
    },

    onEditing($this, event) {
      $this.target = event.post;
      $this.editing = true;

      this.scrollToTop();
    },

    onStartCreating($this) {
      $this.creating = true;
      bus.dispatch('post-creating');

      this.scrollToTop();
    },

    onTagDeleted(event) {
      if (this.creating)
        return;
        
      let tag = event.tag;
      let post = this.target;

      this.removeTagFromPost(tag, post);
    }
  }
}
</script>