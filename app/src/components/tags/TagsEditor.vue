<template>
  <tags-input 
    :tags="parsedTags"
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
      return this.$target();
    },

    selected() {
      return this.target ? this.target.tags : [];
    },

    mainTag() {
      return this.target ? this.target.mainTag : null;
    },

    parsedTags() {
      let tags = this.tags;

      // Selecting tags
      for (let { id } of this.selected)
      {
        let tag = this.getTag(id);

        if (tag)
          tag.selected = true;
      }

      // Adding main tag
      if (!!!this.mainTag)
        return tags;

      let tag = this.getTag(this.mainTag.id);
      if (!!!tag)
        return tags;

      tag.main = true;

      return tags;
    }
  },

  mounted() {
    Tags.all().then((tags) => {
			this.tags = tags;
		});
  },

  methods: {
    getTag(id) {
      for (let tag of this.tags)
      {
        if (tag.id === id)
          return tag;
      }

      return null;
    }
  }
}
</script>