<template>
  <main class="posts">
      
      <filter-bar/>

      <section class="selected container">
        <overlay src="img/svg/selected-overlay.svg"/> 
       
        <slot/>
      </section>


    <pool :model="model"/>
  
  </main>
</template>

<script>

import FilterBar from '@components/posts/FilterBar'
import Overlay from '@components/posts/Overlay'
import Pool from '@components/cards/Pool'

export default {
  name: 'post-layout',

  components: {
    FilterBar,
    Overlay,
    Pool,
  },

	props: {
		model: {
			type: Object,
		}
	},

}
</script>
