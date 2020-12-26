<template>
  <dropup 
    ref="dropup"
    class="whiteboard__group-inner-mobile--sizes"
    :disabled="disabled"
    @open="open"
    @close="close">

    <template #list>
      <button 
        v-for="(size, index) of shownList"
        :key="index"

        class="whiteboard__button-size-mobile whiteboard__button-mobile"
        :class="'whiteboard__button-size-mobile--' + size.value"

        @click="select(size)">
      </button>
    </template>

    <template #button>
      <button 
        class="whiteboard__button-size-mobile whiteboard__button-mobile whiteboard__button-mobile--selected"
        :class="['whiteboard__button-size-mobile--' + selectedValue, 
                 opened ? 'whiteboard__button-mobile--active' : '']">
      </button>
    </template>
  </dropup>
</template>

<script>
import HandleWhiteboardDropup from '@mixins/HandleWhiteboardDropup'
import Dropup from '@components/games/whiteboard/interface/mobile/Dropup'

export default {
  components: {
    Dropup
  },

  mixins: [ HandleWhiteboardDropup ],

  data() {
    return {
      list: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
      ]
    }
  }
}
</script>