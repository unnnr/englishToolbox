<template>
  <tags-input 
    :tags="tags"
    :disabled="loading"
    v-validate/>
</template>

<script>
import TagsInput from '@components/inputs/TagsInput'
import Tags from '@models/Tags'

export default {
  components: {
    TagsInput
  },

  inject: [ '$target' ],

  data() {
    return {
      loading: false,
      tags: [],
    }
  },

  computed: {
    target() {  
      return this.$target;
    },

    selectedTags() {
      return this.target ? this.target.tags : [];
    }
  },

  mounted() {
    Tags.all().then((tags) => {
			this.tags = tags;
		});
  }
}
</script>