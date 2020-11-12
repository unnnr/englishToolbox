<template>
  <div class="addition__tab comments">
    <div class="addition__tab-header">
      <h6 class="heading-sixth">
        {{ counter }}
      </h6>

      <shrink-button 
        class="addition__tab-shrink-button"
        :disabled="empty"
        :shrinked="shrinked"
        @click.native="toggle">
      </shrink-button>
    </div>

    <shrinkable 
      v-if="commentsShown"
      class="addition__tab-body comments__body"
      ref="shrinkable"
      :to="firstCommentHeight"
      :max-height="maxHeight"
      :shrinked-by-default="mobile">

      <transition name="fade">
        <div 
          v-if="empty"
          class="comments__body-overlay"
          :style="{'background-image': overlayUrl}">
        </div>
      </transition>

      <comment 
        v-for="({message, createdAt, user}, id) of comments"
        :key="id"
        
        :created-at="createdAt"
        :message="message"
        :user='user'/>

    </shrinkable>

    <comment-input
      v-if="inputShown"
      @sending="sendComment"/>
  </div>
</template>

<script>
import ShrinkableTab from '@mixins/ShrinkableTab'
import CommentInput from '@components/comments/CommentInput'
import Comment from '@components/comments/Comment'
import Auth from '@services/Auth'

export default {
  components: {
    CommentInput,
    Comment
  },

  mixins: [ ShrinkableTab ],

  inject: [ '$target', 'model' ],

  props: {
    mobile: { type: Boolean, default: false }
  },

  data() {
    return {
      img: 'img/svg/overlay-comments.svg',
      comments: [],
      inputShown: false,
    }
  },

  computed: {
    target() {
      return this.$target();
    },

    overlayUrl(){
      return 'url(' + this.img + ')';
    },

    empty() {
      return !!!this.comments.length;
    },

    commentsShown() {
      return !!!this.mobile || !!!this.empty;
    },

    counter() {
      return this.comments.length + ' comments';
    },

    maxHeight() {
      return this.mobile ? 230 : null; 
    }
  },

  mounted() {
    this.loadComments();

    // If user authenticated -> showing input
    Auth.check().then(authenticated => 
			this.inputShown = authenticated);
    
    // Shrinking comments 
    if (!!!this.mobile)
      return;
      
    let shrinkable = this.$refs.shrinkable;
    if (!!!shrinkable)
      return 0;

    shrinkable.height = this.firstCommentHeight();
  },

  methods: {
    firstCommentHeight() {
      if (this.empty)
        return 0;

      let shrinkable = this.$refs.shrinkable;
      if (!!!shrinkable)
        return 0;

      let wrapper = shrinkable.$refs.content;
      if (!!!wrapper)
        return  0;

      let firstComment = wrapper.children[0];
      if (!!!firstComment)
        return 0;

      return firstComment.offsetHeight + 'px';
    },

    async loadComments() {
      if (!!!this.target || !!!this.model)
        return;

      let postId = this.target.id;

      this.comments = 
        await this.model.comments.get(postId);
    },

    async sendComment(event) {
      try {
        // Preparing data
        let data = new FormData();
        let message = event.entry;
        let postId = this.target.id;
        data.append('message', message);
 
        // Sending new comment
        let comment = 
          await this.model.comments.create(postId, data);

        // Appending response
        this.comments.push(comment);
      }
      catch(error) {
        bus.dispatch('alert-error');
      }
      finally {
        event.sended();
      }
    }
  }
  
}
</script>

<style lang="sass">

/*  or :not(.shrinkable--closed).comments__body */
.shrinkable--opened.comments__body,
.shrinkable--opening.comments__body,
.shrinkable--closing.comments__body
  overflow-y: scroll

.comments__body .shrinkable__content
  display: flex
  flex-direction: column
  gap: 20px

</style>