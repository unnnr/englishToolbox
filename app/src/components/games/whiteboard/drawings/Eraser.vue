<template>
  <penline
    :path="path"
    :size="size"
    color="#ffffff"/>
</template>

<script>
import Penline from '@components/games/whiteboard/drawings/Penline'

export default {
  components: { 
    Penline
  },

  props: {
    path: { type: Object, default: () => {} },

    size: { type: Number, default: 1 },
  }
}
</script>