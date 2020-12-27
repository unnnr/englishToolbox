<template>
  <dropup 
    ref="dropup"
    class="whiteboard__group-inner-mobile--color"
    :disabled="disabled"
    @open="updateList">

    <template #list>
      <button 
        v-for="(color, index) of shownList"
        :key="index"

        class="whiteboard__button-color-mobile whiteboard__button-mobile"
        :class="'whiteboard__button-color-mobile--' + color.name"

        @mousedown.stop="select(color)">
      </button>
    </template>

    <template #button>
      <button 
        class="whiteboard__button-color-mobile whiteboard__button-mobile whiteboard__button-mobile--selected"
        :class="['whiteboard__button-color-mobile--' + seletedOrFirst.name, 
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

  props: { 
    value: { type: String, default: null },
  },

  data() {
    return {
      list: [
        { value: '#111111', name: 'black'},
        { value: '#7C5C5C', name: 'brown'},
        { value: '#ff6688', name: 'red'},
        { value: '#f9a922', name: 'yellow'},
        { value: '#1dd1bb', name: 'green'},
        { value: '#6666ff', name: 'blue'},
      ]
    }
  }
}
</script>