<template>
  <div class="whiteboard">
    <whiteboard-drawings-preview/>

    <whiteboard-users/>
  </div>
</template>

<script>
import WhiteboardDrawingsPreview from '@components/games/whiteboard/WhiteboardDrawingsPreview.vue'
import WhiteboardUsers from '@components/games/whiteboard/interface/WhiteboardUsers'

export default {
  components: { 
    WhiteboardDrawingsPreview,
    WhiteboardUsers
  },
}
</script>