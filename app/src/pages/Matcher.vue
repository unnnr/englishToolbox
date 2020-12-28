<template>
  <section class="games container">
    <div class="games__selected">
      <div class="matcher"  ref="canvas">
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

<style lang="sass">

.matcher
  position: absolute
  width: 100%
  height: 100%

  
.matcher canvas
  width: 100%
  height: 100%

</style>
