<template>
  <div 
		v-if="shown"
    class="profile-popup"
    :style="{
      'top': marginTop,
			'left': marginLeft}">

    <div 
      class="profile-popup__image"
      :style="{'bacground-image': this.avatarUrl}">
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
      'profile-popup': this.show
    })
  },

  methods: {
    show(event) {
      console.log(event);
    }
  }
}
</script>

<style lang="sass">

.profile-popup
  position: absolute

</style>