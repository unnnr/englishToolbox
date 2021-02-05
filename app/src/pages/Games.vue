<template>
  <section class="games container">
    <games-player
      :game="component"
      @close="close"/>
    
    <games-pool
      :game="game"
      @select="select"/>
  </section>
</template>

<script>
import GamesPlayer from '@pages/games/GamesPlayer'
import GamesPool from '@pages/games/GamesPool'
import Auth from '@services/Auth'
import bus from '@services/eventbus'


export default {
  components: {
    GamesPlayer,
    GamesPool
  },

  data() {
    return {
      game: null,
      component: null,

      authenticated: false
    }
  },

  mounted() {
    this.load();
  },

  methods: {
    async select(game) {
      if (!!!this.authenticated)
        return;
        
      this.game = game;

      let module = await game.loader();
      this.component = module.default;

      this.$emit('select', game);
    },

    close() {
      this.game = null;
      this.component = null;
    },

    async load() {
      this.authenticated = await Auth.check();

      if (!!!this.authenticated)
        this.redirectGuest();
    },
    
    redirectGuest() {
      bus.dispatch('alert-guest', {
        cancel: () => this.$router.push({
          path: '/home'
        })
      });
    },
  }
}
</script>