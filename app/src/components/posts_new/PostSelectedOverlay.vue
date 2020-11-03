<template>
    <div class="selected__overlay container">
      <img 
        class="selected__overlay-body"
        src="img/svg/overlay-selected.svg"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      img: '#'
    }
  }
}
</script>

<style lang="sass" scoped>

.selected__overlay
  display: block

</style>