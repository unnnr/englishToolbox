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
    <button class="profile-popup__button-ban"></button>
  </div>
</template>

<script>
import HandleEvents from '@mixins/HandleEvents'

export default {
  mixins: [ HandleEvents ],

  data() {
		return {
      showing: false,
      shown: false,
			user: null,

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
    }
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

      this.move(event.el);
      this.show();
    },
  }
}
</script>

<style lang="sass">


.profile-popup
  position: absolute
  z-index: 2

.profile-popup-enter
  animation: popupFadein .5s

.profile-popup-leave
  animation: popupFadeout .5s
  z-index: 1

@keyframes popupFadein
  from 
    opacity: 0
    transform: translateY(5px)
  to 
    opacity: 1
    transform: translateY(0)

@keyframes popupFadeout 
  from 
    opacity: 1
  to 
    opacity: 0
    transform: translateY(5px)

</style>