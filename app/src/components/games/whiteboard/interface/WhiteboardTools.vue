<template>
  <div class="whiteboard__element whiteboard__element--tool">
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
  </div>
</template>

<script>
import {Trash, Eraser, Pencil, Ellipse, Triangle, Rectangle} from '@services/whiteboard/Tools'

export default {
  data() {
    return {
      type: null
    }
  },

  mounted() {
    this.select('rectangle');
  },

  methods: {
    isSelected(type) {
      return this.type === type;
    },

    select(type) {
      if (this.type === type)
        return;
        
      this.type = type;

      switch (type) {
        case 'trash':
          this.$emit('change', new Trash());
          return;

        case 'eraser':
          this.$emit('change', new Eraser());
          return;

        case 'pencil':
          this.$emit('change', new Pencil());
          return;

        case 'ellipse':
          this.$emit('change', new Ellipse());
          return;

        case 'triangle':
          this.$emit('change', new Triangle());
          return;

        case 'rectangle':
          this.$emit('change', new Rectangle());
          return;

        default:
          this.$emit('change', null);
      }
    }
  }
}
</script>