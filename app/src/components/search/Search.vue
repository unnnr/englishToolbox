<template>
  	<div class="search">
				<input ref="inut" type="text" placeholder="search">

				<div class="search__dropdown">	
					<div class="search__dropdown-content search__dropdown-content--active">
						
            <search-hit/>

					
					</div>
				</div>
			</div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import instantsearch from 'instantsearch.js';
import SearchHit from '@components/search/SearchHit'

export default {
  components: {
    SearchHit
  },

  data() {
    return {
      searchClient: algoliasearch(
      'latency',
      '6be0576ff61c053d5f9a3225e2a90f76'
      )
    }
  },

  mounted() {
    const self = this;

    const search = instantsearch({
      indexName: 'instant_search',
      searchClient: this.searchClient,
    });

    search.addWidgets([ {
      init(opts) {
        let helper = opts.helper;
        let input = self.$refs.input;
        if (!!!input)
          return;

        input.addEventListener('input', ({currentTarget}) => {
          helper.setQuery(currentTarget.value) // update the parameters
                .search(); // launch the query
        });
      }
    }]);

     search.addWidgets([{
      render(options) {
        const results = options.results;
        // read the hits from the results and transform them into HTML.

        console.log(results);

        return;
        document.querySelector('#hits').innerHTML = results.hits
          .map(
            hit => `<p>${instantsearch.highlight({ attribute: 'title', hit })}</p>`
          )
          .join('');
      },
    }]);

    // search.start();
  }
}
</script>