<template>
  <post-details-mobile 
    v-if="mobile" 
    :onlyEditor="onlyEditor"/>

  <post-details-desktop 
    :onlyEditor="onlyEditor"
    v-else/>
</template>

<script>
import { debounce } from 'throttle-debounce';

export default {
  components: {
    PostDetailsDesktop: 
      () => import('@components/posts_new/PostDetailsDesktop'),

    PostDetailsMobile: 
      () => import('@components/posts_new/PostDetailsMobile')
  },

  props: {
    onlyEditor: { type: Boolean, default: false },
  },

  data() {
    return {
      mobile: false,
      mobileBorder: 1200
    }
  },

  mounted() {
		this.$options.eventHandler = debounce(500, this.check);

    window.addEventListener('resize', 
      this.$options.eventHandler);
  },

	beforeDestroy() {
		window.removeEventListener('resizeresize',
			this.$options.eventHandler);
	},

  methods: {
    check() {
      if (!!!this.mobile && window.innerWidth > this.mobileBorder)
        this.mobile = true;

      else if (this.mobile && window.innerWidth <= this.mobileBorder)
        this.mobile = false;
    },

    select() {

    }
  }
}
</script>
