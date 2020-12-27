<template>
  <section class="games container">
    <div class="games__selected">
      <div class="games__player">
        <canvas ref="canvas"/>
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

