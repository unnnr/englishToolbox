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
      img: '/img/svg/overlay-selected.svg'
    }
  },

  computed: {
    url() {
      return 'url(' + window.origin + this.img + ')';
    }
  }
}
</script>
