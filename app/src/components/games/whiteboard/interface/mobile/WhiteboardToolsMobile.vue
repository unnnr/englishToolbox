<template>
  <div class="whiteboard__group-inner-mobile whiteboard__group-inner-mobile--tool">
    <transition
      v-for="(group, index) of groups"
      :key="index"

      name="whiteboard__element"

      @before-enter="open(group)"
      @before-leave="close(group)">

      <div
        class="whiteboard__element-dropup-mobile"
        :class="{'whiteboard__element-dropup-mobile--active': group.opened}"
        @mousedown.stop="close(group)">

        <button 
          v-for="(tool, index) of group.shown"
          :key="index"

          class="whiteboard__button-tool-mobile whiteboard__button-mobile"
          :class="'whiteboard__button-tool-mobile--' + tool.name"
          
          @mousedown.stop="select(tool, group)">
        </button>
      </div>
    </transition>
    
    <div class="whiteboard__element-mobile">
      <template
        v-for="(group, index) of groups">
       
        <button 
          :key="index"
          class="whiteboard__button-tool-mobile whiteboard__button-tool-mobile whiteboard__button-mobile"
          :class="['whiteboard__button-tool-mobile--' + groupSelected(group).name,
                   isSelected(groupSelected(group)) ? 'whiteboard__button-mobile--selected' : '',
                   group.opened ? 'whiteboard__button-mobile--active': '']"
          @mousedown.stop="toggle(group)">
        </button>

        <div 
          v-if="separatorShown(index)"
          :key="index + groups.length"
          class="whiteboard__separator-mobile">
        </div>
      </template>
     </div>
  </div>
</template>

<script>
import {Trash, Eraser, Pencil, Ellipse, Polygon, Triangle, Rectangle, Inspector} from '@services/whiteboard/Tools'

export default {
  data() {
    return {
      groups: [
        { 
          selected: null,
          opened: false, 
          shown: [],
          list: [
            {value: Pencil, name: 'pencil'},
            {value: Polygon, name: 'pen'},
          ],
        },
        { 
          opened: false, 
          selected: null,
          shown: [],
          list: [
            {value: Rectangle, name: 'square'},
            {value: Ellipse, name: 'ellipse'},
            {value: Triangle, name: 'triangle'},
          ],
        },
        {
          selected: null,
          opened: false, 
          shown: [],
          list: [
            {value: Eraser, name: 'eraser'},
            {value: Inspector, name: 'eraser-god'},
            {value: Trash, name: 'trash'},
          ],
        },
      ],

      selected: null
    }
  },

  beforeMount() {
    for (let group of this.groups)
      this.updateList(group)

    this.select(this.groups[0].list[0], this.groups[0]);

    this.$options.binded = () => {
      console.log('binded');

      for (let group of this.groups)
        this.close(group);
    }

    document.body.addEventListener('mousedown', this.$options.binded, true);
  },

  beforeDestroy() {
    this.$options.binded = this.close.bind(this);
    document.body.removeEventListener('mousedown', this.$options.binded, true);
  },

  methods: {
    separatorShown(index) {
      return index !== this.groups.length - 1
    },

    close(group) {
      if (group.opened && !!!this.$options.opening)
        group.opened = false;
    },

    open(group) {
      this.updateList(group);
      if (!!!this.isSelected(this.groupSelected(group)))
        this.select(this.groupSelected(group), group);
        
      group.opened = true;

      this.$options.opening = true;
      setTimeout(() => this.$options.opening = false, 500);
    },

    toggle(group) {
      if (group.opened)
        this.close(group)
      else
        this.open(group)
    },

    select(tool, group) {
      console.log(tool, group);

      this.selected = tool;
      group.selected = tool;

      this.$emit('input', tool && new tool.value);
    },

    isSelected(tool) {
      return this.selected === tool;
    },

    groupSelected(group) {
      return group.selected || group.list[0];
    },

    updateList(group) {
      let shown = [...group.list];

      let index = shown.indexOf(this.groupSelected(group));
      if (index !== -1)
        shown.splice(index, 1);

      group.shown = shown;
    }
  }
}
</script>