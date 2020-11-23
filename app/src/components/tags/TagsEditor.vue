<template>
  <tags-input 
    :tags="parsedTags"
    :create-new="createNew"
    v-validate/>
</template>

<script>
import TagsInput from '@components/inputs/TagsInput'
import Tags from '@models/Tags'

import FakeData from '@services/FakeData'

export default {
  components: {
    TagsInput
  },

  inject: [ '$target' ],

  data() {
    return {
      tags: [],
    }
  },

  computed: {
    target() {  
      return this.$target();
    },

    selected() {
      return (this.target && this.target.tags) ? this.target.tags : [];
    },

    mainTag() {
      return this.target ? this.target.mainTag : null;
    },

    parsedTags() {
      let tags = [];

      for (let tag of this.tags) {
        if (!!!tag.default)
          tags.push(tag);
      }

      // Selecting tags
      for (let { id } of this.selected)  {
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
    },

    async createNew(label) {
      // Collecting data
      let data = new FormData();
      data.append('label', label);
      data.append('color', FakeData.generateColor())

      // Submitting 
      let tag = await Tags.create(data);

      // Appending created tag
      this.$set(tag, 'created', true);
      this.tags.push(tag);

      // Dispatching event
      bus.dispatch('tag-created', { tag });
    }
  }
}
</script>