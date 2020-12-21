<template>
  <div class="whiteboard__group whiteboard__group--users">
    <div class="whiteboard__group-inner">
      <whiteboard-panel class="whiteboard__element--square whiteboard__element--small">
        <button class="whiteboard__button-control--unlock whiteboard__button-control"></button>
      </whiteboard-panel>

      <whiteboard-panel class="whiteboard__element--small">
        <button class="whiteboard__button-online"><span class="whiteboard__online-count">5</span>users online</button>
      </whiteboard-panel>
    </div>

    <div
      v-if="active"
      class="whiteboard__users-dropdown whiteboard__users-dropdown--bannable">
      
      <div class="whiteboard__user">
        <div class="whiteboard__user-avatar"></div>
        <p class="whiteboard__user-name text-fifth">Pepe Frog</p>
      </div>

      <div class="whiteboard__user">
        <div class="whiteboard__user-avatar"></div>
        <p class="whiteboard__user-name text-fifth">Ronald Richards</p>
      </div>
    </div>

  </div>
</template>

<script>
import WhiteboardPanel from '@components/games/whiteboard/interface/WhiteboardPanel'

export default {
  components: {
    WhiteboardPanel
  },

  data() {
    return {
      active: false
    }
  }
}
</script>