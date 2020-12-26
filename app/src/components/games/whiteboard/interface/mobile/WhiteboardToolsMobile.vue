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
        :class="{'whiteboard__element-dropup-mobile--active': group.opened}">
        <button 
          v-for="(tool, index) of group.shown"
          :key="index"

          class="whiteboard__button-tool-mobile whiteboard__button-mobile"
          :class="'whiteboard__button-tool-mobile--' + tool.name">
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
          @click="toggle(group)">
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
export default {
  data() {
    return {
      groups: [
        { 
          selected: null,
          opened: false, 
          shown: [],
          list: [
            {name: 'pencil'},
            {name: 'pen'},
          ],
        },
        { 
          opened: false, 
          selected: null,
          shown: [],
          list: [
            {name: 'square'},
            {name: 'ellipse'},
            {name: 'triangle'},
          ],
        },
        {
          selected: null,
          opened: false, 
          shown: [],
          list: [
            {name: 'eraser'},
            {name: 'eraser-god'},
            {name: 'trash'},
          ],
        },
      ],

      selected: null
    }
  },

  beforeMount() {
    for (let group of this.groups)
      this.updateList(group)

    this.selected = this.groups[0].list[0];
  },

  methods: {
    separatorShown(index) {
      return index !== this.groups.length - 1
    },

    close(group) {
      group.opened = false;
    },

    open(group) {
      group.opened = true;
    },

    toggle(group) {
      if (group.opened)
        this.close(group)
      else
        this.open(group)
    },

    select(tool) {
      this.selected = tool;
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