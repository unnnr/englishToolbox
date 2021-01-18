<template>
  <div v-show="shown">
    <div 
      ref="player"
      class="games__selected games__mobile">

      <transition
        name="fade"
        mode="out-in">

        <component :is="game"/>

      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: { default: null }
  },

  data() {
    return {
      shown: false
    }
  },

  watch: {
    game(game) {
      if (game)
        this.show();
    },

    shown(value) {
      if (!!!value)
        this.$emit('close');
    } 
  },

  computed: {
    orientation() {
      let orientation = screen.orientation; 
      if (!!!orientation.type)
        orientation = screen.mozOrientation || screen.msOrientation;

      return orientation;
    }
  },

  mounted() {
    this.fullscreenToggled = 
      this.fullscreenToggled.bind(this);

    window.addEventListener('fullscreenchange', 
      this.fullscreenToggled);
  },  

  beforeDestroy() {
    window.removeEventListener('fullscreenchange', 
      this.fullscreenToggled);
  },

  methods: {
    show() {
      let player = this.$refs.player;
      player.requestFullscreen();
    },

    fullscreenToggled() {
      if (!!!this.orientation)
        return;
        
      this.shown = 
        Boolean(document.fullscreenElement); 
      
      if (this.shown)
        this.orientation.lock('landscape').catch(() => {});
      else
        this.orientation.unlock();
    }
  }
}
</script>