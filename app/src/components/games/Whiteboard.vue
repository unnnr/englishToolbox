<template>
  <div class="whiteboard">
    <whiteboard-controls/>

    <whiteboard-config/>

    <whiteboard-users/>

    <whiteboard-canvas/>
  </div>
</template>

<script>
import WhiteboardControls from '@components/games/whiteboard/interface/WhiteboardControls'
import WhiteboardConfig from '@components/games/whiteboard/interface/WhiteboardConfig'
import WhiteboardUsers from '@components/games/whiteboard/interface/WhiteboardUsers'
import WhiteboardCanvas from '@components/games/whiteboard/WhiteboardCanvas'

export default {
  components: {
    WhiteboardControls,
    WhiteboardConfig,
    WhiteboardCanvas,
    WhiteboardUsers,
  }
}
</script>