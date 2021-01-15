<template>
  <mobile-player 
    v-if="mobile"
    :game="game"
    @close="close"/>

  <desktop-player
    :game="game"
    v-else/>
</template>

<script>
import DesktopPlayer from '@pages/games/GamesPlayerDesktop'
import MobilePlayer from '@pages/games/GamesPlayerMobile'
import Resolution from '@services/Resolution'


export default {
  components: {
    DesktopPlayer,
    MobilePlayer
  },

  props: {
    game: { default: null }
  },

  provide() {
    const _this = this;

    return {
      $mobile: () => _this.mobile,
    }
  },

  data() {
    return {
      mobile: true
    }
  },
  

  beforeMount() {
		Resolution.bind(this.resolutionChanged);
	},

	beforeDestroy() {
		Resolution.detach(this.check);
	},

  methods: {
    resolutionChanged(type) {
      this.mobile = Resolution.DESKTOP !== type
    },
    
    close() {
      this.$emit('close');
    }
  }
}
</script>