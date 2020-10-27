<template>
  <main>
    <post-selected>

      <template #player>
        <div style="padding: 30px; background: red">
        </div>
      </template> 

      <template #editor>
        <post-editor/>
      </template>

    </post-selected>


    <pool/>
    
  </main>
</template>

<script>

import PostSelected from '@components/posts_new/PostSelected'
import PostEditor from '@components/posts_new/PostEditor_TEMP'
import Pool from '@components/cards_new/Pool'

export default {
  components: {
    PostSelected,
    PostEditor,
    Pool
  }
}
</script>