<template>
  <div class="addition__tab comments">
    <div class="addition__tab-header">
      <h6 class="heading-sixth">
        {{ counter }}
      </h6>
      <button class="addition__tab-shrink-button"></button>
    </div>

    <div 
      class="addition__tab-body comments__body"
      :class="{'comments__body--empty': overlayShown}">

      <div 
        class="comments__body-overlay"
        :style="{'background-image': imageUrl}">
      </div>
      
     <!--  <transition name="fade">
        <div 
          class="comments__overlay"
          v-if="overlayShown">

          <img  :style="{'background-image': imageUrl}">
        </div>
      </transition> -->

      <comment 
        v-for="({message, createdAt, user}, id) of comments"
        :key="id"
        
        :image="user.avatar"
        :author="user.name"

        :created-at="createdAt"
        :message="message"/>

    </div>

    <comment-input v-if="inputShown"/>
    
  </div>
</template>

<script>
import CommentInput from '@components/comments/CommentInput'
import Comment from '@components/comments/Comment'

import FormatedDate from '@services/FormatedDate'
import Faker from 'faker/locale/ja'


export default {
  components: {
    CommentInput,
    Comment
  },

  inject: [ '$target' ],

  data() {
    return {
      img: 'img/svg/overlay-comments.svg',
      inputShown: true
    }
  },

  computed: {
    target() {
      return this.$target();
    },

    imageUrl(){
      return 'url(' + this.img + ')';
    },

    overlayShown() {
      return !!!this.comments.length;
    },

    comments() {
      if (!!!this.target || !!!this.target.comments)
        return [];

      return this.target.comments;
    },

    counter() {
      return this.comments.length + ' comments';
    }
  }
}
</script>

<style lang="sass" scoped>

.comments__overlay
  display: flex
</style>