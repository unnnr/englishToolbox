<template>
  <div class="management__tab-body">
    <transition name="fade">
      <div 
        class="management__account-overlay"
        v-if="empty">

        <object class="management__account-overlay-image" data="/img/svg/comments-overlay.svg" type="image/svg+xml"></object>
      </div>
    </transition>

    <button class="management__comments-delete-button text-fourth">
      <span class="material-icons-round">delete_forever</span>delete all
    </button>
    
    <div class="management__tab-content">
      <div class="management__tab-scrollable">
        <div
          class="management__comment"
          v-for="comment in comments"
          :key="comment.id">

          <div class="management__comment-image"></div>
          <div class="managment__comment-wrapper">
            <div class="managment__comment-header">
              <h6 class="heading-sixth">{{ comment.post.title }}</h6>
              <button class="management__comment-delete-button">
                <span class="material-icons-round">delete_forever</span>
              </button>
            </div>
            <div class="comment">
              <div class="comment__body">
                <p class="comment__text text-sixth">
                  <span class="comment__name">{{ comment.user.name }}</span>
                  <!-- <span class="comment__mention">{{}}</span> -->
                  {{ comment.message }}
                </p>
                <time class="comment__date text-sixth">{{ comment.createdAt }}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Comments from '@models/Comments'
import User from '@models/User'

export default {
  data: function () {
    return {
      comments: null
    }
  },

  computed: {
    loading() {
      return this.comments === null;
    },

    empty() {
      return !!!this.loading && this.comments.length === 0
    }
  },

  beforeMount() {
    this.load();
  },

  methods: {
    async load() {
      this.comments = await User.comments();
    }
  }
}
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity 2s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>