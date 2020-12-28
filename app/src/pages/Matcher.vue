<template>
  <section class="games container">
    <div class="games__selected">
      <div class="matcher">
        <canvas class="matcher__canvas" ref="canvas"/>
      </div>
    </div>
  </section>
</template>

<script>
import Matcher from '@services/matcher/Matcher'

export default {
  mounted() {
    let canvas = this.$refs.canvas;

    this.game = new Matcher(canvas);  
    
    this.game.start();
  }
}
</script>

<style lang="sass" scoped>

.matcher
  position: absolute
  
.matcher__canvas
  width: 100%
  height: 100%

</style>
