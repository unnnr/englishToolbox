const HandleWhiteboardDropup = {
	data() {
		return {
      list: [],
      shownList: [],

      opened: false,
      selected: null,
		}
  },

  computed: {
    selectedValue() {
      if (this.selected)
        return this.selected.value;

      if (this.list.length)
        return this.list[0].value
        
      return null; 
    }
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

    select(value) {
      this.selected = value;
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