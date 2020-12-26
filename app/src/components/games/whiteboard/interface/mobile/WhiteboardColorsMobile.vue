<template>
  <dropup 
    ref="dropup"
    @open="open"
    @close="close">

    <template #list>
      <button 
        v-for="(color, index) of shownColors"
        :key="index"

        class="whiteboard__button-color-mobile whiteboard__button-mobile"
        :class="'whiteboard__button-color-mobile--' + color.name"

        @click="select(color)">
      </button>
    </template>

    <template #button>
      <button 
        :key="selectedKey"
        class="whiteboard__button-color-mobile whiteboard__button-mobile whiteboard__button-mobile--selected"
        :class="['whiteboard__button-color-mobile--' + selectedColor, 
                 opened ? 'whiteboard__button-mobile--active' : '']">
      </button>
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
      selected: null,
      opened: false,
      shownColors: [],
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
    selectedColor() {
      return this.selected ? this.selected.name : 'black'
    },

    selectedKey() {
      return this.selected ? this.selected.name : null
    },
  },

  beforeMount() {
    this.select(this.colors[0]);
    this.updateList();
  },

  methods: {
    open() {
      this.updateList();
      this.opened = true;
    },

    close() {
      this.opened = false;
    },

    select(color) {
      this.selected = color;
    },

    updateList() {
      let shown = [...this.colors];

      let index = shown.indexOf(this.selected);
      if (index !== -1)
        shown.splice(index, 1);

      this.shownColors = shown;
    }
  }
}
</script>