<template>
  <div 
    class="whiteboard__interface"
    ref="fragment">

    <whiteboard-config/>

    <whiteboard-controls/>
    
    <whiteboard-users/>
  </div>
</template>

<script>
import WhiteboardControls from '@components/games/whiteboard/interface/WhiteboardControls'
import WhiteboardConfig from '@components/games/whiteboard/interface/WhiteboardConfig'
import WhiteboardUsers from '@components/games/whiteboard/interface/WhiteboardUsers'

export default {
  components: {
    WhiteboardControls,
    WhiteboardConfig,
    WhiteboardUsers
  },

  mounted() {
    this.removefragment();
  },

  methods: {
		removefragment() {
			let fragment = this.$refs.fragment;
			if (!!!fragment)
				return;

			let parent = fragment.parentNode;
			if (!!!parent)
				return;

			while (fragment.firstChild)
        parent.appendChild(fragment.firstChild);
      
      fragment.remove();
    },
  }
}
</script>

<style lang="sass">

.whitebord__interface
  position: absolute
  height: 100%
  width: 100%
  top: 0

</style>