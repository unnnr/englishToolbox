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

      <button
        class="tag"
        type="button"
        
        v-for="(tag) of sortedTags"
        :key="tag.id"

        :class="{ 
          'tag--created': tag.created,
          'tag--main': tag.main
        }"
        :style="{ 
          'background-color': tag.selected ? tag.color : '' 
        }"
        
        v-context:items="createContext(tag)"
        @click="toggle(tag)">

        <span class="tag__name" for="cb2">{{ tag.label }}</span>
      </button>
    </transition-group>
	</div>
</template>

<script>
import NewTagInput from '@components/tags/NewTagInput'
import bus from '@services/eventbus';

const MAX_TAGS_COUNT = 5;

export default {
	components: {
		NewTagInput
  },

  props: {
    tags: { type: Array, default: () => [] },

    selected: { type: Array, default: () => {}}
  },
  
  data() {
		return {
			selectedCount: 0,
			main: null,
		}
  },
  
  computed: {
    sortedTags() {
			let sorted = [];

			for (let tag of this.tags)
			{
				if (tag.created)
					sorted.unshift(tag);
				else
					sorted.push(tag);
			}

			return sorted;
    },
    
    counter() {
			return this.selectedCount + '/' + MAX_TAGS_COUNT;
    }
  },

  watch: {
    selected: {
      get() {
        let selected = [];

        for (let tag of this.tags)
        {
          if (tag.selected || tag.main)
            selected.push(tag);
        }

        return selected;
      },

      set(value) {
        for (let tag of this.selectedTags)
          this.unselect(tag);

        for (let tag of value)
           this.select(tag);
      }
    },

    main(newTag, previousTag) {
      if (newTag)
        newTag.main = true;

      if (previousTag)
        previousTag.main = false;
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
              if (tag.selected)
              {
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

    getTag(id) {
      for (let tag of this.tags)
      {
        if (id === tag.id)
          return tag
      }
      
      return null;
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
      if (!!!tag.selected)
        this.select(tag);
      else
        this.unselect(tag);
		},
  }
}
</script>

<style lang="sass">

.tags-enter
  transform: scale(0.5)
  opacity: 0

.tags-enter-active
  transition: transform .3s ease-in-out, opacity .4s ease-in-out

</style> 