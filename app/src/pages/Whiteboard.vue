<template>
  <section class="games container">
    <div class="games__selected">

      <div class="whiteboard">

        <whiteboard-controls/>

        <whiteboard-config/>

        <whiteboard-users/>

        <whiteboard-canvas/>
      </div>
    </div>
  </section>
</template>

<script>
import WhiteboardControls from '@components/games/whiteboard/WhiteboardControls'
import WhiteboardConfig from '@components/games/whiteboard/WhiteboardConfig'
import WhiteboardCanvas from '@components/games/whiteboard/WhiteboardCanvas'
import WhiteboardUsers from '@components/games/whiteboard/WhiteboardUsers'

export default {
  components: {
    WhiteboardControls,
    WhiteboardConfig,
    WhiteboardCanvas,
    WhiteboardUsers,
  }
}
</script>