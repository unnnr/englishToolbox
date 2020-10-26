<template>
  <section class="selected container">

    <post-selected-overlay/>

    <post-player>
      <slot name="player"/>
    </post-player>

    <post-addition> 
      <slot name="editor"/>
    </post-addition>

  </section>
</template>

<script>

import PostSelectedOverlay from '@components/posts_new/PostSelectedOverlay'
import PostAddition from '@components/posts_new/PostAddition'
import PostPlayer from '@components/posts_new/PostPlayer'

export default {
  components: {
    PostSelectedOverlay,
    PostAddition,
    PostPlayer
  }
}
</script>