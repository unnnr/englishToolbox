<template>
  <prescreen
    v-if="!!!started"
    @start="start"/>

  <irregular-list
    v-else/>
</template>

<script>
import IrregularList from '@components/games/verbs/IrregularList'
import Prescreen from '@components/games/verbs/Prescreen'

export default {
  components: {
    IrregularList,
    Prescreen
  },

  data() {
    return {
      started: false
    }
  },

  methods: {
    start() {
      this.started = true;
    }
  }
}
</script>