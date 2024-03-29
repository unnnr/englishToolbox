<template>
  <tags-input 
    :tags="parsedTags"
    @deleting="deleting"
    @creating="creating"
    v-validate/>
</template>

<script>
// services
import Tags from '@models/Tags'
import bus from '@services/eventbus'

// mixins
import HandleRequests from '@mixins/HandleRequests'

// components
import TagsInput from '@components/inputs/TagsInput'


export default {
  components: {
    TagsInput
  },

	mixins: [ HandleRequests ],

  inject: [ '$target' ],

  data() {
    return {
      tags: []
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
    generateColor() {
      const CUT_FROM  = 60;
      const CUT_TO = 160;
      const COUNT = 1000;

      let range = 360 - CUT_TO + CUT_FROM;
      let hue = Math.floor(Math.random() * COUNT) 
        * (range / COUNT) % range;

      if (hue > CUT_FROM)
        hue += CUT_TO - CUT_FROM;

      return `hsl(${hue}, 70%, 70%)`;
    },

    getTag(id) {
      for (let tag of this.tags)
      {
        if (tag.id === id)
          return tag;
      }

      return null;
    },

    showError(errors, messages) {
      if (messages)
        return messages.label;
    },

    creating(event) {
      let finnaly = event.loaded;
      let label = event.label;

      this.send(
        this.createTag.bind(this, label),
        this.showError,
        finnaly);
    },

    deleting(event) {
      async function request() {
        let tag = event.tag;

        await this.deleteTag(tag);
        event.then();

        bus.dispatch('tag-deleted', { tag })
      }

      this.send(request.bind(this));
    },

    async deleteTag(tag) {
      await Tags.delete(tag.id);
      
      let index = this.tags.indexOf(tag);
      if (index === -1)
        return;

      this.tags.splice(index, 1);
    },

    async createTag(label) {
      // Collecting data
      let data = new FormData();
      data.append('label', label);
      data.append('color', this.generateColor())

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