<template>
  <div class="matcher__progress-bar">
    <div 
      ref="progress"
      class="matcher__progress-bar-current"
      :style="{'width': progressWidth}">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: { type: Number, default: 0 }
  },
  
  computed: {
    progressWidth() {
      return this.progress + '%';
    },
  }
}
</script>