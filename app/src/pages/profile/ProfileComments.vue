<template>
  <div class="profile__tab profile__comments">
    <h5 class="profile__tab-title heading-fifth">Your comments</h5>
    <button class="profile__tab-button profile__tab-button--delete-all text-fifth">delete all</button>
    <div class="profile__tab-comments">

      <div class="profile__tab-scrollable">
        <div 
          v-if="overlayShown"
          class="profile__tab-comments-overlay"
          :style="{'background-image': overlayUrl}">
        </div>

        <comment 
          v-for="{id, user, createdAt} in comments"
          :key="id"
          :user="user"
          :created-at="createdAt"/>
      </div>

    </div>
  </div>
</template>

<script>
import Comment from '@components/comments/Comment'

export default {
  components: {
    Comment
  },

  data() {
    return {
      comments: [],
      img: 'img/svg/overlay-comments.svg',
    }
  },

  computed: {
    overlayUrl() {
      return 'url(' + this.img + ')';
    },

    overlayShown() {
      return this.comments.length === 0;
    }
  }
}
</script>