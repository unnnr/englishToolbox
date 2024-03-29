<template>
  <div 
		v-if="shown"
    
    ref="popup"
    class="profile-popup"
    :class="{'profile-popup-enter': showing}"
    
    v-click-outside="hide"
    :style="{
      'top': marginTop,
			'left': marginLeft}">

    <div 
      class="profile-popup__image"
      :style="{'background-image': this.avatarUrl}">
    </div>

    <div class="profile-popup__text">
      <h4 class="profile-popup__name heading-sixth">
        {{ userName }}
      </h4>

      <time class="profile-popup__date text-sixth">
        Created at {{ userCreatedAt }}
      </time>
    </div>
    
    <button
      v-if="banButtonShown"
      class="profile-popup__button-ban"
      @click="tryBan">
    </button>
  </div>
</template>

<script>
import HandleEvents from '@mixins/HandleEvents'
import Auth from '@services/Auth'

export default {
  mixins: [ HandleEvents ],

  data() {
		return {
      showing: false,
      shown: false,

      user: null,
      ban: null,

			left: 0,
			top: 0,
		}
  },
  
  computed: {
		marginLeft() {
			return this.left + 'px';
		},

		marginTop() {
			return this.top + 'px';
    },
    
    userAvatar() {
      return (this.user && this.user.avatar) ? this.user.avatar : '#';
    },

    userName() {
      return (this.user && this.user.name) ? this.user.name : '#Ad8$!k&j';
    },

    userCreatedAt() {
      return (this.user && this.user.createdAt) ? this.user.createdAt : '*(a933^';
    },

    avatarUrl() {
      return 'url(' + this.userAvatar + ')';
    },

    banButtonShown() {
      return typeof this.ban === 'function'
    },
  },
  
  mounted() {
    this.listen({
      'profile-popup': this.parseEvent
    })
  },

  methods: {
    remove() {
      // Retrieving current toooltip DOM element
      let popup = this.$refs.popup;
      if (!!!popup)
        return;

      // Creating removing node
      let cloned = popup.cloneNode(true);
      let parent = popup.parentNode;

      cloned.classList.add('profile-popup-leave');
      parent.appendChild(cloned);

      // Waiting for animation end
      const REMOVING_DELAY = 500;
      setTimeout(() => 
        cloned.remove(), REMOVING_DELAY);
    },

    comutedCords(el) {
      const OFFEST_TOP = 15;
      const OFFSET_LEFT = 30;

      let left = -OFFSET_LEFT;
      let top = -OFFEST_TOP;
    
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        left += el.offsetLeft - el.scrollLeft;
        top += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }

      return [left, top];
    },

    move(el) {
      let [x, y] = this.comutedCords(el);
      this.left = x;
      this.top = y;
    },

    show() {
      const DELAY = 500;
      
      // Needed to prevent further 'v-outside' events
      this.showing = true;
      setTimeout(() =>  {
        this.showing = false;
      }, DELAY);

      this.shown = true;
    },

    hide() {
      if (this.showing)
        return;

      this.remove();
      this.shown = false;
    },

    parseEvent(event) {
      // Removing previous popup with animation
      if (this.shown)
        this.remove();

      let user = event.user;
      if (user && typeof user === 'object' )
        this.user = user;
      
      this.ban = event.ban;
      this.move(event.el);
      this.show();
    },

    async tryBan() {
      if (typeof this.ban !== 'function')
        return;

      await this.ban();
      this.hide();
    }
  }
}
</script>
