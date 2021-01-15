<template>
  <div v-show="shown">
    <div 
      ref="player"
      class="games__selected">

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
      this.shown = Boolean(document.fullscreenElement); 

      if (this.shown)
        screen.orientation.lock('landscape').catch(() => {});
      else
        screen.orientation.unlock();
    }
  }
}
</script>