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
      mobile: false,
      mobileBorder: 1200
    }
  },

  mounted() {
    Resolution.bind(this.check);
  },

	beforeDestroy() {
    Resolution.detach(this.check);
	},

  methods: {
    check(mobile, tablet, desktop) {
      this.mobile = !!!desktop;
    }
  }
}
</script>