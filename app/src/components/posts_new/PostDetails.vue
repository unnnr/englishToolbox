<template>
  <post-details-mobile 
    v-if="mobile" 
    :editing="editing"
    :creating="creating">

    <slot/>
  </post-details-mobile>
    

  <post-details-desktop 
    v-else
    :editing="editing"
    :creating="creating"
    @switching="event => $emit('switching', event)">

    <slot/>
  </post-details-desktop>
</template>

<script>
import { throttle } from 'throttle-debounce';

export default {
  components: {
    PostDetailsDesktop: 
      () => import('@components/posts_new/PostDetailsDesktop'),

    PostDetailsMobile: 
      () => import('@components/posts_new/PostDetailsMobile')
  },

   props: {
    creating: { type: Boolean, default: false },

    editing: { type: Boolean, default: false }
  },

  data() {
    return {
      mobile: false,
      mobileBorder: 1200
    }
  },

  mounted() {
    this.check();

		this.$options.eventHandler = throttle(200, this.check);
    window.addEventListener('resize', 
      this.$options.eventHandler);
  },

	beforeDestroy() {
		window.removeEventListener('resizeresize',
			this.$options.eventHandler);
	},

  methods: {
    check() {
      if (this.mobile && window.innerWidth > this.mobileBorder)
        this.mobile = false;

      else if (!!!this.mobile && window.innerWidth <= this.mobileBorder)
        this.mobile = true;
    },

    select() {

    }
  }
}
</script>
