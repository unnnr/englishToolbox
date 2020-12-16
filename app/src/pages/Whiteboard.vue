<template>
  <section class="games container">
    <div class="games__selected">

      <div class="whiteboard">
        <whiteboard-canvas/>

        <whiteboard-controls/>

        <whiteboard-users/>

        <whiteboard-config/>
      </div>
    </div>
  </section>
</template>

<script>
import WhiteboardControls from '@components/games/whiteboard/WhiteboardControls'
import WhiteboardCanvas from '@components/games/whiteboard/WhiteboardCanvas'
import WhiteboardConfig from '@components/games/whiteboard/WhiteboardConfig'
import WhiteboardUsers from '@components/games/whiteboard/WhiteboardUsers'

export default {
  components: {
    WhiteboardControls,
    WhiteboardCanvas,
    WhiteboardUsers,
    WhiteboardConfig,
  }
}
</script>