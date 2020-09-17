<template>
  <div class="post-layout">
    <div class="order-wrapper">
      
      <filter-bar/>

      <section class="selected container">
        <overlay src="asset('img/svg/selected-overlay.svg')"/> 
        <slot/>
      </section>

    </div>

    <pool/>

  </div>
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
  }
}
</script>