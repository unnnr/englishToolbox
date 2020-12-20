<template>
  <div class="whiteboard__ui">
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
  }
}
</script>