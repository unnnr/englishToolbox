<template>
  <div class="comment">

    <div 
      class="comment__image"
      :style="{'background-image': url}"
      @click="showPopup" >
    </div>

      <p class="comment__text text-sixth">
        <span class="comment__name">
          {{ authorName }}
        </span>

        {{ message }}

        <time class="comment__date">
          {{ createdAt}}
        </time>
      </p>

	</div>
</template>

<script>
import bus from '@services/eventbus'

export default {
  props: {
    createdAt: { type: String, default: 'Feb 24 2020'},

    message: { type: String, default: '恨み はなじ ぶき じぞう 封筒 推奨 あう 部首 やさい けいじばん' },
    
    user: { type: Object, default: null },

    id: { type: Number, default: null},

    popupOptions: { type: Object, default: null },

    withoutPopup: { type: Boolean, default: false },
  },

  computed: {
    authorName() {
      return this.user ? this.user.name : '陽菜'
    },

    avatar() {
      return this.user ? this.user.avatar : '#';
    },

    url() {
      return 'url(' + this.avatar + ')';
    }
  },

  methods: {
    showPopup() {
      if (this.withoutPopup)
        return;

      let commentId = this.id;
      let user = this.user;
      let el  = this.$el;
      let ban = null;

      if (this.popupOptions && typeof this.popupOptions === 'object')
        ban = this.popupOptions.ban;

      bus.dispatch('profile-popup', {
        commentId, user, el, ban
      })
    },
  }
}
</script>