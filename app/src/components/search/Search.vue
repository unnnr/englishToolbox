<template>
  	<div class="search">
				<input 
          v-model="query"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          placeholder="search"
          spellcheck="false" 
          @input="throttledInput"
          @focus="show"
          @blur="hide">

				<div class="search__dropdown">	
					<div 
            class="search__dropdown-content"
            :class="{'search__dropdown-content--active': active}">
						
            <search-hit
              v-for="hit of hits"
              :key="hit.objectID"

              :thumbnail="hit.thumbnail"
              :title="hit.title"

              :main-tag="hit.mainTag"
              :tags="hit.tags"
              @click.native="redirectTo(hit)"/>
					</div>
				</div>
			</div>
</template>

<script>
import instantsearch from 'instantsearch.js'
import algoliasearch from 'algoliasearch/lite'
import SearchHit from '@components/search/SearchHit'
import { throttle } from 'throttle-debounce';

export default {
  components: {
    SearchHit
  },

  data() {
    return {
      shown: false,
      query: '',
      hits: [],

      searchClient: algoliasearch(
        '935M213CXE', 'cd89ba96eb6549adb8d90b48d8c9e685',
      ),

      // Throttled onInput event
      throttledInput: null,

      // Callback initiated by instantsearch
      preparedRequest: null,
    }
  },

  computed: {
    active() {
      return this.shown && this.hits.length;
    }
  },

  mounted() {
    const self = this;

    // Initiating search instance
    const search = instantsearch({
      indexName: 'posts',
      searchClient: this.searchClient,
    });

    search.addWidgets([{
      init(opts) {
         self.preparedRequest = () => 
          self.request(opts.helper)
      }
    }]);

    search.addWidgets([{
      render(options) {
        if (!!!options.state.query)
          return;
          
        self.parseRespose(options.results);
      }
    }]);

    search.start();
    
    // Initiating input callback
    const DELAY = 1000;

    this.throttledInput = 
      throttle(DELAY, this.onInput);
  },

  methods: {
    show() {
      this.shown = true;
      this.$emit('open');
    },

    hide() {
      this.shown = false;
      this.$emit('close');
    },

    request(helper) {
      if (this.query.length === 0) {
        this.parseRespose({ hits: [] })
        return;
      }

      helper
        .setQuery(this.query)
        .search();
    },

    parseRespose(response) {
      this.hits = response.hits.slice(0, 5);
    },

    redirectTo(hit) {
      let id = hit.objectID;
      let type = hit.type;
      
      for (let part of location.pathname.split('/')) {
        if (part !== type)
          continue; 

        bus.dispatch('post-founded', { hit });
        return;
      }

      this.$router.push({
        path: '/'  + type + '/' + id
      }).catch(() => null);
    },

    onInput() {
      let callback = this.preparedRequest;
      if (typeof callback === 'function')
        callback();
    }
  }
}
</script>

<style lang="sass">
.search__dropdown-content
  position: relative

.search-hits-move 
  transition: transform 4s ease-in-out

.search-hits-enter-active
  transition: all .5s !important


.search-hits-enter, .search-hits-leave-to
  opacity: 0 !important

</style>