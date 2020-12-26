<template>
  <dropup 
    ref="dropup"
    @open="updateList">

    <template #list>
      <button 
        v-for="(color, index) of shownList"
        :key="index"

        class="whiteboard__button-color-mobile whiteboard__button-mobile"
        :class="'whiteboard__button-color-mobile--' + color.name"

        @click="select(color)">
      </button>
    </template>

    <template #button>
      <button 
        class="whiteboard__button-color-mobile whiteboard__button-mobile whiteboard__button-mobile--selected"
        :class="['whiteboard__button-color-mobile--' + selectedValue, 
                 opened ? 'whiteboard__button-mobile--active' : '']">
      </button>
    </template>
  </dropup>
</template>

<script>
import HandleWhiteboardDropup from '@mixins/HandleWhiteboardDropup'
import Dropup from '@components/games/whiteboard/interface/mobile/Dropup'

export default {
  mixins: [ HandleWhiteboardDropup ],

  components: {
    Dropup
  },

  data() {
    return {
      list: [
        { value: 'black', name: 'black'},
        { value: 'brown', name: 'brown'},
        { value: 'red', name: 'red'},
        { value: 'yellow', name: 'yellow'},
        { value: 'green', name: 'green'},
        { value: 'blue', name: 'blue'},
      ]
    }
  }
}
</script>