<template>
  <div class="management__tab-body">
    <transition name="fade">
      <div 
        class="management__account-overlay"
        v-if="empty">

        <object class="management__account-overlay-image" data="/img/svg/comments-overlay.svg" type="image/svg+xml"></object>
      </div>
    </transition>

    <button 
      class="management__comments-delete-button text-fourth"
      :disabled="sending">

      <span class="material-icons-round">delete_forever</span>delete all
    </button>
    
    <div class="management__tab-content">
      <div class="management__tab-scrollable">

        <transition-group 
          name="list"
          @before-leave="setAbsolute">

          <div
            class="management__comment"
            v-for="comment in comments"
            :key="comment.id">

            <div class="management__comment-image"></div>
            <div class="managment__comment-wrapper">
              <div class="managment__comment-header">
                <h6 class="heading-sixth">{{ comment.post.title }}</h6>

                <button 
                  class="management__comment-delete-button"
                  :disabled="sending"
                  @click="remove(comment)">

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
        </transition-group>
    
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
      comments: null,

      sending: false
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
    setAbsolute(target) {
			Object.assign(target.style, {
        position: 'absolute',
				top: target.offsetTop + 'px',
				left: target.offsetLeft + 'px',
				width: target.offsetWidth + 'px'
			})
    },
    
    async load() {
      this.comments =  await User.comments();
    },

    async remove(comment) {
      this.sending = true;
   
      await Comments.delete(comment.id)
      .finally(() => this.sending = false);

         
      let index = this.comments.indexOf(comment);
      this.comments.splice(index, 1);
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

  .list-move {
  transition: transform 1s ease-in-out,
  						opacity 1s ease-in-out;
}

.list-enter-active
{
   -webkit-animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-bottom .5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.list-leave-active {
	-webkit-animation: scale-out .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: scale-out .5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@-webkit-keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
		-webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}
@keyframes scale-out {
  0% {
    -webkit-transform: scale(1);
            transform: scale(1);
		-webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  }
}

@-webkit-keyframes scale-in-bottom {
  0% {
    -webkit-transform: scale(.5);
            transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
}

@keyframes scale-in-bottom {
  0% {
    -webkit-transform: scale(.5);
            transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 1;
  }
}
</style>