import ShrinkableWrapper from '@components/Shrinkable'
import ShrinkButton from '@components/buttons/ShrinkButton'


const Shrinkable = {
	components: {
    Shrinkable: ShrinkableWrapper,
    ShrinkButton
  },
    
  props: {
    mobile: { type: Boolean, default: false }
  },

  data() {
    return {
      shrinked: false,
    }
  },
  
  watch: {
    target() {
      if (!!!this.mobile)
        return;
      
      this.shrink();
      this.shrinked = true;
    }
  },

	methods: {
    toggle() {
      let shrinkable = this.$refs.shrinkable;

      if (shrinkable)
        this.shrinked = shrinkable.toggle();
    },

    shrink() {
      if (this.shrinked)
        return
      
      let shrinkable = this.$refs.shrinkable;
      
      if (!!!shrinkable)
        return;

      shrinkable.close();
    },
  }
};

export default Shrinkable;