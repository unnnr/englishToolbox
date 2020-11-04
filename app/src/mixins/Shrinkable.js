import ShrinkableWrapper from '@components/Shrinkable'
import ShrinkButton from '@components/buttons/ShrinkButton'


const Shrinkable = {
	components: {
    Shrinkable: ShrinkableWrapper,
    ShrinkButton
	},

  data() {
    return {
      shrinked: false,
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