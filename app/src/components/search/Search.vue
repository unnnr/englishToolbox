<template>
  	<div class="search">
				<input 
          v-model="query"
          type="text"
          placeholder="search"
          @input="throttledInput">

				<div class="search__dropdown">	
					<div class="search__dropdown-content search__dropdown-content--active">
						
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
      query: '',

   
      hits: [],

      // JSON.parse(`[{"thumbnail":"https://img.youtube.com/vi/5qap5aO4i9A/sddefault.jpg","title":"lofi hip hop radio - beats to relax/study to","mainTag":{"id":2,"label":"paleturquoise","color":"paleturquoise","default":null},"tags":[],"objectID":"10","_highlightResult":{"thumbnail":{"value":"https://img.youtube.com/vi/5qap5aO4i9A/sddefault.jpg","matchLevel":"none","matchedWords":[]},"title":{"value":"<em>lofi</em> hip hop radio - beats to relax/study to","matchLevel":"full","fullyHighlighted":false,"matchedWords":["lofi"]},"mainTag":{"id":{"value":"2","matchLevel":"none","matchedWords":[]},"label":{"value":"paleturquoise","matchLevel":"none","matchedWords":[]},"color":{"value":"paleturquoise","matchLevel":"none","matchedWords":[]}}}}]`),
      
      // searchClient: algoliasearch(
      //   'latency',
      //   '6be0576ff61c053d5f9a3225e2a90f76'
      // ),

       searchClient: algoliasearch(
        '935M213CXE',
        'cd89ba96eb6549adb8d90b48d8c9e685',
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
        self.parseRespose(options.results);
      }
    }]);

    search.start();
    
    // Initiating input callback
    const DELAY = 500;

    this.throttledInput = 
      throttle(DELAY, this.onInput)
  },

  methods: {
    request(helper) {
      if (this.query.length === 0)
        return;
        
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