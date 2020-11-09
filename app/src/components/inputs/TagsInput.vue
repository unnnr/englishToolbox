<template>
  <div ref="fragment">
		<h6 class="editor__tag-title heading-sixth">
      Add tags 
      <span class="editor__tag-counter">
        {{ counter }}
      </span>
		</h6>

    <transition-group 
      ref="tags"
      class="tags"
      name="tags"
      tag="div">

      <new-tag-input
        ref="input"
        :key="-1"
        :submit="() => {}"/>

      <tag
        v-for="(tag) of sortedTags"
        :key="tag.id"

        :color="tag.color"
        :label="tag.label"

        :always-colored="false"
        :disabled="loading"
        
        :selected="tag.selected"
        :created="tag.created"
        :main="tag.main"

        v-context:items="createContext(tag)"
        @click.native="toggle(tag)"/>
    </transition-group>
	</div>
</template>

<script>
import NewTagInput from '@components/tags/NewTagInput'
import Tag from '@components/tags/Tag'
import bus from '@services/eventbus';

const MAX_TAGS_COUNT = 5;

export default {
	components: {
    NewTagInput,
    Tag
  },

  props: {
    tags: { type: Array, default: () => [] },
  },
  
  data() {
		return {
			selectedCount: 0,
      loading: false,
		}
  },
  
  computed: {
    sortedTags: {
      get() {
        let created = [];
        let selected = [];
        let remained = [];
        let main = null;
        
        // Splitting tags into sactions
        for (let tag of this.tags)
        {
          if (tag.main)
            main = tag;

          else if (tag.selected)
            selected.push(tag);

          else if (tag.created)
            created.push(tag);

          else 
            remained.push(tag);
        }

        // Combining tags sections into one array
        let sorted = [...selected, ...created, ...remained];
        
        if (main)
          sorted.unshift(main);
        
        return sorted;
      },

      cache: false
    },

    selected() {
      let selected = [];

      for (let tag of this.tags)
      {
        if (tag.selected && !!!tag.main)
          selected.push(tag);
      }

      return selected;
    },

    counter() {
			return this.selectedCount + '/' + MAX_TAGS_COUNT;
    },

    main: {
      set(newTag) {
        let preveios = this.$options.main;
        if (preveios) {
          this.$set(preveios, 'selected', false);
          this.$set(preveios, 'main', false);
        }

        this.$options.main = newTag;
        if (newTag) {

          this.$set(newTag, 'selected', true);
          this.$set(newTag, 'main', true);
        }
      },

      get() {
        return (this.$options.main === undefined) ? null : 
          this.$options.main;
      },

      cache: false
    }
  },

  watch: {
    tags: {
      handler(tags) {
        this.selectedCount = 0;
        
        for (let tag of tags)
        {
          if (!!!tag.selected)
            this.$set(tag, 'selected', false);

          if (tag.main)
            this.main = tag;
          else
            this.$set(tag, 'main', false);

          if (tag.selected || tag.main)
            this.selectedCount++;
        }   
      },

      immediate: true,
    }
  },

  mounted() {
    this.removefragment();
  },
  
  methods: {
		removefragment() {
			let fragment = this.$refs.fragment;
			if (!!!fragment)
				return;

			let parent = fragment.parentNode;
			if (!!!parent)
				return;

			while (fragment.firstChild)
				parent.appendChild(fragment.firstChild);
    },

    createContext(tag) {
			return () => {
        if (tag.main) {
          return {
            'Unmain': 
              () => this.main = null
          }
        }
        else {
          return {
            'Set as main': () => {
              if (tag.selected) {
                this.main = tag;
                return;
              }          

              if (this.toggle(tag))
                this.main = tag; 
            }
          }
        }      
      }
    },

    select(tag) {
      if (this.selectedCount >= MAX_TAGS_COUNT)
        return false;
        
      // Selecting tag
      this.selectedCount++;
      this.$set(tag, 'selected', true);

      // if current main tag is unset
      //    making selected tag main
      if (!!!this.main)
          this.main = tag;
    },

    unselect(tag) {
      // If unselected tag is main  
      //    removing main tag
      if (tag.main)
        this.main = null;
      
      // Unselecting tab tag
      this.selectedCount--;
      this.$set(tag, 'selected', false);  
    },
    
    toggle(tag) { 
      if (tag.selected)
        this.unselect(tag);
      else
        this.select(tag);
    },

    submit(data) {
      // Appending main tag to data
      let mainTag = this.main;
      if (mainTag)
        data.append('mainTag', mainTag.id)

      // Appending selected tags to data
      let selected = this.selected;
      if (selected)
      {
        for (let index in selected)
          data.append(`tags[${index}]`, selected[index].id);
      }
    } 
  }
}
</script>

<style lang="sass">

.tags-move 
  transition: transform .4s ease-in-out

.tags-enter
  transform: scale(0.5)
  opacity: 0

.tags-enter-active
  transition: transform .3s ease-in-out, opacity .4s ease-in-out

</style> 