<template>
  <main>
    <post-selected>

      <template #player>
        <img src="some player, can be even iframe">
      </template> 

      <template #editor>
        <post-editor/>
      </template>

    </post-selected>

    <div class="space"></div>
  </main>
</template>

<script>

import PostSelected from '@components/posts_new/PostSelected'
import PostEditor from '@components/posts_new/PostEditor_TEMP'

export default {
  components: {
    PostSelected,
    PostEditor
  }
}
</script>