import HandleEvents from '@mixins/HandleEvents';
import PostSelectedOverlay from '@components/posts_new/PostSelectedOverlay'
import PostDetails from '@components/posts_new/PostDetails'
import PostPlayer from '@components/posts_new/PostPlayer'
import bus from '@services/eventbus'

const HandlePost = {
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
    editing () {
      return !!!this.creating;
    },

    currentPostProcessor: {
      get() {
        return this.editing ?
          this.$refs.editor : 
          this.$refs.creator
      },

      cache: false
    },

    requireWarning: {
      get() { 
        return this.currentPostProcessor 
          && this.currentPostProcessor.hasChanges()
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

export default HandlePost;