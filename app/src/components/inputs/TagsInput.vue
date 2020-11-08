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
          'background-color': (tag.selected || tag.main) ? tag.color : '' 
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
    defaultTags: { type: Array, default: () => [] },
  },
  
  data() {
		return {
      tags: [],
			selectedCount: 0,
      main: null,
		}
  },
  
  computed: {
    sortedTags() {
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

      console.log('sorting');
      
			return sorted;
    },

    counter() {
			return this.selectedCount + '/' + MAX_TAGS_COUNT;
    }
  },

  watch: {
    main(newTag, previousTag) {
      if (previousTag)
        this.$set(previousTag, 'main', false);

      if (newTag)
        this.$set(newTag, 'main', true);
    },

    defaultTags: {
      handler(tags) {
        this.selectedCount = 0;

        for (let tag of tags)
        {
          if (tag.main)
            this.main = tag;

          if (tag.selected || tag.main)
            this.selectedCount++;
        }

        console.log('watching');

        this.tags = 
          JSON.parse(JSON.stringify(this.defaultTags));
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