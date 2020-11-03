<template>
    <div class="selected__overlay container">
      <div 
        class="selected__overlay-body"
        :style="{'background-image': url}"> </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      img: 'img/svg/overlay-selected.svg'
    }
  },

  computed: {
    url() {
      return 'url(' + this.img + ')';
    }
  }
}
</script>

<style lang="sass" scoped>

.selected__overlay
  display: block

</style>