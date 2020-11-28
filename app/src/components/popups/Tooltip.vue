<template>
  <div 
    v-if="shown"
    ref="tooltip"
    class="tooltip"
    :style="{
      'left': marginLeft,
      'top': marginTop}">

    <div class="tooltip__arrow"></div>
      
    <p class="text-fifth">{{ label }}</p>
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
    this.$el.dispatchEvent(
			new CustomEvent('tooltip:mounted', { detail: this })
    );
  },

  methods: {
    remove() {
      // Retrieving current toooltip DOM element
      let tooltip = this.$refs.tooltip;
      if (!!!tooltip)
        return;

      // Creating removing node
      let cloned = tooltip.cloneNode(true);
      let parent = tooltip.parentNode;

      cloned.classList.add('tooltip--removed');
      parent.appendChild(cloned);

      // Waiting for animation end
      const REMOVING_DELAY = 500;
      setTimeout(() => 
        cloned.remove(), REMOVING_DELAY);
    },

    move(x, y) {
      this.left = x;
      this.top = y;
    },

    hide() {
      this.remove();
      this.shown = false;
    },

    show() {
      this.shown = true;
    }
  }
}
</script>
