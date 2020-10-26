<template>
  <div class="addition">

    <div class="addition__header">
      <button>Description</button>
      <button>Comments</button>
      <button>Editor</button>
    </div>

    <div class="addition__tabs">

      <post-info/>

      <post-comments/>

      <post-editor/>
    </div>
  </div>
</template>

<script>

import PostComments from '@components/posts_new/PostComments'
import PostEditor from '@components/posts_new/PostEditor'
import PostInfo from '@components/posts_new/PostInfo'

export default {
  components: {
    PostComments,
    PostEditor,
    PostInfo
  }
}
</script>