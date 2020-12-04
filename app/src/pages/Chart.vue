<template>
 <main class="posts">

    <filter-bar/>

    <post-selected
      :editor-has-changes="editorHasChanges"
      :creator-has-changes="creatorHasChanges">

      <template #creator>
        <chart-creator ref="creator"/>
      </template>

      <template #editor>
        <chart-editor ref="editor"/>
      </template>

      <template #player>
        <chart-player/>
      </template>

    </post-selected>
    
    <posts-pool/>

  </main>
</template>

<script>
// services
import Charts from '@models/Charts'

// mixins
import HandlePost from'@mixins/HandlePost'

// coponents
import PostSelected from '@components/posts/PostSelected'
import ChartCreator from '@pages/chart/ChartCreator'
import ChartPlayer from '@pages/chart/ChartPlayer'
import ChartEditor from '@pages/chart/ChartEditor'
import FilterBar from '@components/layout/FilterBar'
import PostsPool from '@components/posts/PostsPool'


export default {
  components: {
    PostSelected,
    ChartCreator,
    ChartPlayer,
    ChartEditor,
    FilterBar,
    PostsPool
  },

  mixins: [ HandlePost ],

  provide: {
    model: Charts
  }
}
</script>