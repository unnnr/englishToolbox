<template>
  <dropup>
    <template #list>
      <button class="whiteboard__button-color-mobile whiteboard__button-color-mobile--black whiteboard__button-mobile"></button>
      <button class="whiteboard__button-color-mobile whiteboard__button-color-mobile--brown whiteboard__button-mobile"></button>
      <button class="whiteboard__button-color-mobile whiteboard__button-color-mobile--red whiteboard__button-mobile"></button>
      <button class="whiteboard__button-color-mobile whiteboard__button-color-mobile--yellow whiteboard__button-mobile"></button>
      <button class="whiteboard__button-color-mobile whiteboard__button-color-mobile--green whiteboard__button-mobile"></button>
    </template>

    <template #button>
      <button class="whiteboard__button-color-mobile whiteboard__button-color-mobile--blue whiteboard__button-mobile whiteboard__button-mobile--selected whiteboard__button-mobile--active"></button>
    </template>
  </dropup>
</template>

<script>
import Dropup from '@components/games/whiteboard/interface/mobile/Dropup'

export default {
  components: {
    Dropup
  },

  data() {
    return {
      colors: [
        { value: '', name: 'black'},
        { value: '', name: 'brown'},
        { value: '', name: 'red'},
        { value: '', name: 'yellow'},
        { value: '', name: 'green'},
        { value: '', name: 'blue'},
      ]
    }
  },

  computed: {
    parsedColors() {
      return 123
    }
  }
}
</script>