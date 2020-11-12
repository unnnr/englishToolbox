<template>
  <div class="profile__tab profile__comments">
    <h5 class="profile__tab-title heading-fifth">Your comments</h5>
    <button 
      class="profile__tab-button profile__tab-button--delete-all text-fifth"
      :disabled="sending || empty"
      @click="removeAll">
      
      delete all
    </button>
    
    <div class="profile__tab-comments">
      <div class="profile__tab-scrollable">
        <transition name="fade">
          <div 
            v-if="empty"
            class="profile__tab-comments-overlay"
            :style="{'background-image': overlayUrl}">
          </div>
        </transition>
        

         <div class="profile__tab-comment"    
          v-for="comment in comments"
          :key="comment.id">

          <comment 
            :user="comment.user"
            :message="comment.message"
            :created-at="comment.createdAt"/>

            <button 
              class="profile__tab-button profile__tab-button--delete-comment"
              @click="remove(comment)">
            </button>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from '@models/Comments'
import Comment from '@components/comments/Comment'

export default {
  components: {
    Comment
  },

  data() {
    return {
      img: 'img/svg/overlay-comments.svg',
      comments: [],
      sending: false,
    }
  },

  computed: {
    overlayUrl() {
      return 'url(' + this.img + ')';
    },

    empty() {
      return this.comments.length === 0;
    }
  },

  mounted() {
    this.load();
  },

  methods: {
    async load() {
      this.comments =  await User.comments();
    },

    async removeAll() {
      if (this.sending)
        return;

      this.sending = true;

      await User.deleteComments()
      .finally(() => this.sending = false);

      this.comments = [];
    },

    async remove(comment) {
      if (this.sending)
        return;

      this.sending = true;
   
      await Comments.delete(comment.id)
      .finally(() => this.sending = false);
         
      let index = this.comments.indexOf(comment);
      this.comments.splice(index, 1);
    }
  }
}
</script>