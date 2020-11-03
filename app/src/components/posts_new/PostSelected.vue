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
        v-if="editing"
        name="editor"/> 

    </post-details>
  </section>
</template>

<script>
import HandleEvents from '@mixins/HandleEvents';
import PostSelectedOverlay from '@components/posts_new/PostSelectedOverlay'
import PostDetails from '@components/posts_new/PostDetails'
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

      'post-start-creating': 
        this.wrapEvent(this.onStartCreating),

      'post-editing':
        this.wrapEvent(this.onEditing)
    });
  },

  methods: {
    wrapEvent(callback) {
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
        if (!!!this.requireWarning)
          return prepareCallback.call(this, event);

        this.showAlert(prepareCallback.call(this, event))
      }
    },

    trySwitch(event) {
      if (event.from === 'editor' && this.requireWarning)
        return this.showAlert(event.switch);

      event.switch();
    },

    onSelecting(data, event) {
      bus.dispatch('post-selected', event);

      data.target = event.post;  
      Object.assign(this, data);

      // TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEPM TEMP TEMP 
      return;
      // Switching tab to 'Post info'
      if (this.$refs.postDetails)
        this.$refs.postDetails.select('info')
    },

    onEditing(data, event) {
      data.target = event.target;
      data.creating = true;
    },

    onStartCreating(data) {
      data.creating = true;
      
      bus.dispatch('post-creating');
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