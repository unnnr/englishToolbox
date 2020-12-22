<template>
  <whiteboard-panel class="whiteboard__element whiteboard__element--tool">
    <button 
      class="whiteboard__button-tool--pencil whiteboard__button-tool whiteboard__button"
      :class="{'whiteboard__button--selected': isSelected('pencil')}"
      @click="select('pencil')">
    </button>
  
    <button 
      class="whiteboard__button-tool--pen whiteboard__button-tool whiteboard__button"
      :class="{'whiteboard__button--selected': isSelected('pen')}"
      @click="select('pen')">
    </button>
    
    <button 
      class="whiteboard__button-tool--text whiteboard__button-tool whiteboard__button"
      :class="{'whiteboard__button--selected': isSelected('text')}"
      @click="select('text')">
    </button>
    
    <div class="whiteboard__separator"></div>

    <button 
      class="whiteboard__button-tool--triangle whiteboard__button-tool whiteboard__button"
      :class="{'whiteboard__button--selected': isSelected('triangle')}"
      @click="select('triangle')">
    </button>
    
    <button 
      class="whiteboard__button-tool--square whiteboard__button-tool whiteboard__button"
      :class="{'whiteboard__button--selected': isSelected('rectangle')}"
      @click="select('rectangle')">
    </button>     
  
    <button 
      class="whiteboard__button-tool--ellipse whiteboard__button-tool whiteboard__button"
      :class="{'whiteboard__button--selected': isSelected('ellipse')}"
      @click="select('ellipse')">
    </button>
    
    <div class="whiteboard__separator"></div>
    
    <button 
      class="whiteboard__button-tool--eraser-god whiteboard__button-tool whiteboard__button"
      :class="{'whiteboard__button--selected': isSelected('inspector')}"
      @click="select('inspector')">
    </button>

    <button 
      class="whiteboard__button-tool--eraser whiteboard__button-tool whiteboard__button"
      :class="{'whiteboard__button--selected': isSelected('eraser')}"
      @click="select('eraser')">
    </button>

    <button 
      class="whiteboard__button-tool--trash whiteboard__button-tool whiteboard__button"
      :class="{'whiteboard__button--selected': isSelected('trash')}"
      @click="select('trash')">
    </button>
  </whiteboard-panel>
</template>

<script>
import {Trash, Eraser, Pencil, Ellipse, Triangle, Rectangle, Inspector} from '@services/whiteboard/Tools'
import WhiteboardPanel from '@components/games/whiteboard/interface/WhiteboardPanel'

export default {
  components: {
    WhiteboardPanel
  },
  
  props: { 
    value: { type: Object, default: null }
  },

  methods: {
    isSelected(type) {
      return this.value && this.value.type === type;
    },

    select(type) {
      if (this.isSelected(type))
        return;

      let computed = null;

      switch (type) {
        case 'trash':
          computed =  new Trash()
          return;

        case 'eraser':
          computed = new Eraser(); break;

        case 'pencil':
          computed = new Pencil(); break;

        case 'ellipse':
          computed = new Ellipse(); break;

        case 'triangle':
          computed = new Triangle(); break;

        case 'rectangle':
          computed = new Rectangle(); break;

        case 'inspector':
          computed = new Inspector(); break;
      }

      this.$emit('input', computed);
    }

  }
}
</script>