const HandlePost = {
  methods: {
    editorHasChanges() {
      let vm = this.$refs.editor;

      if (!!!vm ||  typeof vm.hasChanges !== 'function')
        return false;
      
      return vm.hasChanges()
    },

    creatorHasChanges() {
      let vm = this.$refs.editor;

      if (!!!vm ||  typeof vm.hasChanges !== 'function')
        return false;

      return vm.hasChanges()
    }
  }
}

export default HandlePost;