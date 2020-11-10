<template>
  <div 
    v-if="shown"
    class="tooltip"
    :style="{
      'left': marginLeft,
      'top': marginTop}">

    <div class="tooltip__arrow"></div>
      
    {{ label }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: 0,
      left: 0,

      label: '',
      shown: false,
    }
  },

  computed: {
    marginLeft() {
      return this.left + 'px';
    },

    marginTop() {
      return this.top + 'px';
    }
  },

  mounted() {
    console.log('mount');
    this.$el.dispatchEvent(
			new CustomEvent('tooltip:mounted', { detail: this })
    );
  },

  methods: {
    move(x, y) {
      this.left = x;
      this.top = y;
    },

    hide() {
      this.shown = false;
    },

    show() {
      this.shown = true;
    }
  }
}
</script>

<style lang="sass">
.tooltip 
  position: absolute
  color: white
</style>