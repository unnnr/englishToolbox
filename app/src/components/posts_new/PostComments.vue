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

    <div 
      class="addition__tab-body comments__body"
      :class="{'comments__body--empty': empty}">

      <shrinkable ref="shrinkable">

        <transition name="fade">
          <div 
            v-if="empty"
            class="comments__body-overlay"
            :style="{'background-image': imageUrl}">
          </div>
        </transition>

        <comment 
          v-for="({message, createdAt, user}, id) of comments"
          :key="id"
          
          :image="user.avatar"
          :author="user.name"

          :created-at="createdAt"
          :message="message"/>

      </shrinkable>
    </div>

    <comment-input v-if="inputShown"/>
    
  </div>
</template>

<script>
import Shrinkable from '@mixins/Shrinkable'
import CommentInput from '@components/comments/CommentInput'
import Comment from '@components/comments/Comment'

import FormatedDate from '@services/FormatedDate'
import Faker from 'faker/locale/ja'


export default {
  components: {
    CommentInput,
    Comment
  },

  mixins: [ Shrinkable ],

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

    empty() {
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