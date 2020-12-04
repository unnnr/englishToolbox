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
              :tags="hit.tags"/>
					
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
      active: false,
      query: '',
      hits: [],

      // searchClient: algoliasearch(
      //   'latency',
      //   '6be0576ff61c053d5f9a3225e2a90f76'
      // ),

      searchClient: algoliasearch(
        '935M213CXE', 'cd89ba96eb6549adb8d90b48d8c9e685',
      ),

      // Throttled onInput event
      throttledInput: null,

      // Callback initiated by instantsearch
      preparedRequest: null,
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
    const DELAY = 700;

    this.throttledInput = 
      throttle(DELAY, this.onInput);
  },

  methods: {
    show() {
      this.active = true;
    },

    hide() {
      this.active = false;
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
      this.hits = response.hits;
    },

    onInput() {
      let callback = this.preparedRequest;
      if (typeof callback === 'function')
        callback();
    },
  }
}
</script>