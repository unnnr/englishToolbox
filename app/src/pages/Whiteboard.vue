<template>
  <section class="games container">
    <div class="games__selected">

      <div class="whiteboard">
        <whiteboard-canvas/>

        <whiteboard-controls/>

        <whiteboard-users/>

        <whiteboard-tools/>
      </div>
    </div>
  </section>
</template>

<script>
import WhiteboardControls from '@components/games/whiteboard/WhiteboardControls'
import WhiteboardCanvas from '@components/games/whiteboard/WhiteboardCanvas'
import WhiteboardUsers from '@components/games/whiteboard/WhiteboardUsers'
import WhiteboardTools from '@components/games/whiteboard/WhiteboardTools'

export default {
  components: {
    WhiteboardControls,
    WhiteboardCanvas,
    WhiteboardUsers,
    WhiteboardTools,
  }
}
</script>