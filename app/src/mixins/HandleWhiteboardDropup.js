const HandleWhiteboardDropup = {
  props: { 
    disabled: { type: Boolean, default: false },

    value: { type: Number, default: -1 }
  },

  data() {
		return {
      list: [],
      shownList: [],

      opened: false,
      selected: null,
		}
  },

  computed: {
    seletedOrFirst() {
      if (this.selected)
        return this.selected;

      if (this.list.length)
        return this.list[0]

      return null;
    },

    selectedValue() {
      return this.seletedOrFirst && this.seletedOrFirst.value; 
    },
  },
  
  beforeMount() {
    this.select(this.list[0])
  },

	methods: {
    open() {
      this.updateList();
      this.opened = true;
    },

    close() {
      this.opened = false;
    },

    select(el) {
      this.selected = el;

      this.$emit('input', el && el.value)
    },

    updateList() {
      let shown = [...this.list];

      let index = shown.indexOf(this.selected);
      if (index !== -1)
        shown.splice(index, 1);

      this.shownList = shown;
    }
	}
}

export default HandleWhiteboardDropup;