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
        v-for="comment of comments"
        :key="comment.id"
        
        v-context:items="createContext(comment)"
        :popup-options="createPopup(comment)"
        :created-at="comment.createdAt"
        :message="comment.message"
        :user="comment.user"/>

    </shrinkable>

    <comment-input
      v-if="canPost"
      :disabled="loading"
      @sending="onCommentSending"/>
  </div>
</template>

<script>
// services
import Bans from '@models/Bans'
import Auth from '@services/Auth'
import bus from '@services/eventbus'

// mixins
import HandleRequests from '@mixins/HandleRequests'
import ShrinkableTab from '@mixins/ShrinkableTab'

// components
import CommentInput from '@components/comments/CommentInput'
import Comment from '@components/comments/Comment'


export default {
  components: {
    CommentInput,
    Comment
  },

  mixins: [ 
    HandleRequests,
    ShrinkableTab,
  ],

  inject: [ '$target', 'model' ],

  props: {
    mobile: { type: Boolean, default: false }
  },

  data() {
    return {
      img: '/img/svg/overlay-comments.svg',
      comments: [],

      banning: false,
      canPost: false,
      canBan: true,
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
			this.canPost = authenticated);
    
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

    remove(userId) {
      for (let i = 0; i < this.comments.length; i++) {
        let component = this.comments[i];

        if (userId !== component.user.id)
          continue;

        this.comments.splice(i, 1);
        // Array size changed, so 
        // we need to move iterator 
        i--;
      }
    },

    createContext(comment) {
      if (!!!this.canBan)
        return null;

      let commentId = comment.id;
      let userId = comment.user.id;

      return {
        'send a ban': 
          this.onBanSending.bind(this, userId, commentId)   
      };
    },

    createPopup(comment) {
      function ban() {
        this.send(this.ban.bind(this, comment.user.id, comment.id))
      }
      
      if (!!!this.canBan)
        return;

      return {
        ban: ban.bind(this)
      }
    },

    onBanSending() {
      this.send(
        this.ban.bind(this, ...arguments));
    },


    onCommentSending() {
      this.send(
        this.postComment.bind(this, ...arguments));
    },

    async ban(userId, commentId) {
      let data = new FormData();
      data.append('user', userId);
      data.append('comment', commentId);
        
      await Bans.create(data);

      this.remove(userId);
    },

    async postComment(message) {
      // Preparing data
      let data = new FormData();
      let postId = this.target.id;
      data.append('message', message);
 
      // Sending new comment
      let comment = 
        await this.model.postComment(postId, data);

      // Appending response
      this.comments.push(comment);
    },

    async loadComments() {
      if (!!!this.target || !!!this.model)
        return;

      let postId = this.target.id;

      this.comments = 
        await this.model.comments(postId);
    }
  }
  
}
</script>