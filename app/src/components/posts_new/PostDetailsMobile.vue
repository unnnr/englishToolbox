<template>
  <div class="addition">
    <div class="addition__tabs">
      <post-info v-if="!!!editing"/>

      <post-comments v-if="!!!editing"/>
        
      <slot v-if="editing"/>
    </div>
  </div>
</template>

<script>
import PostComments from '@components/posts_new/PostComments'
import PostInfo from '@components/posts_new/PostInfo'
import bus from '@services/eventbus'

export default {
  components: {
    PostComments,
    PostInfo, 
  },

  props: {
    editing: { type: Boolean, default: false }
  },

  methods: {
    pendSelection(tabName) {
      let _this = this;

      this.$emit('switching', {
        from: this.activeTab,
        to: tabName,
        
        switch() {
          _this.activeTab = tabName
        }
      });
    },

    select(tabName, forced = true) {
      if (forced)
        return this.activeTab = tabName;;
      
      this.pendSelection(tabName);
    }
  }
}
</script>