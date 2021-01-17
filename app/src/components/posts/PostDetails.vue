<template>
  <post-details-desktop 
    v-if="desktop" 
    :canCreate="canCreate"
    :editing="editing"
    :creating="creating"
    @switching="event => $emit('switching', event)">

    <slot/>
  </post-details-desktop>
  
  <post-details-mobile 
    v-else-if="mobileShown"
    :canCreate="canCreate"
    :editing="editing"
    :creating="creating">

    <slot/>
  </post-details-mobile>
</template>

<script>
import Resolution from '@services/Resolution';

export default {
  components: {
    PostDetailsDesktop: 
      () => import('@components/posts/PostDetailsDesktop'),

    PostDetailsMobile: 
      () => import('@components/posts/PostDetailsMobile')
  },

  props: {
    creating: { type: Boolean, default: false },

    editing: { type: Boolean, default: false }
  },

  data() {
    return {
      desktop: false,
      canCreate: false,
    }
  },

  inject: [ '$target' ],

  computed: {
    target() {
      return this.$target();
    },

    mobileShown() {
      return this.target || this.editing;
    }
  },

  beforeMount() {
    this.loadUser()
  },

  mounted() {
    Resolution.bind(this.check);
  },

	beforeDestroy() {
    Resolution.detach(this.check);
	},

  methods: {
    check(type) {
			this.desktop = Resolution.DESKTOP === type;
    },

     async loadUser() {
      let user = await Auth.user.get();
      this.canCreate = user && user.admin;
     }
  }
}
</script>