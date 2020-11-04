import ShrinkableWrapper from '@components/Shrinkable'

const Shrinkable = {
	components: {
		Shrinkable: ShrinkableWrapper
	},

  data() {
    return {
      shrinked: false,
      togglerAngle: 0
    }
  },

	computed: {
		rotateProperty() {
      let angle = this.shrinked ? 0 : -180;

      return 'rotate(' + angle + 'deg)';
    }
	},

	methods: {
    toggle() {
      let shrinkable = this.$refs.shrinkable;

      if (shrinkable)
        this.shrinked = shrinkable.toggle();
    }
  }
};

export default Shrinkable;