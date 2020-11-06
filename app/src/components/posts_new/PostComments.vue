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
      v-if="!!!empty"
      class="addition__tab-body comments__body"
      ref="shrinkable"
      :to="firstCommentHeight"
      :max-height="230"
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
        
        :image="user.avatar"
        :author="user.name"

        :created-at="createdAt"
        :message="message"/>

    </shrinkable>

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

  props: {
    mobile: { type: Boolean, default: false }
  },

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

    overlayUrl(){
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
  },

  mounted() {
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