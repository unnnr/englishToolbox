<template>
  <v-form 
    class="addition__tab editor"
    ref="form"
    :request="submit"
    secondary>

    <div class="addition__tab-header">
      <h6 class="heading-sixth">Video editor</h6>
    </div>
    <div class="addition__tab-body editor__body">
      
      <youtube-url-input 
        :default-value="link"
        :focusOnMount="!!!editing"
        @changed="updatedLink"/>

      <description-input 
        :default-value="description"/>

      <tags-editor/>
    </div>
    <div class="addition__tab-footer editor__footer">
      <delete-button  
        v-if="editing"
        class="editor__delete-button"
        @click.native="deleteVideo"/>
        
      <confirm-button class="editor__confirm-button"/>
    </div>
  </v-form>
</template>

<script>
import DescriptionInput from '@components/inputs/DescriptionInput'
import YoutubeUrlInput from '@components/inputs/YoutubeUrlInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import DeleteButton from '@components/buttons/DeleteButton'
import TagsEditor from '@components/tags/TagsEditor'
import VForm from '@components/validation/VForm'
import bus from '@services/eventbus'

export default {
  components: {
    DescriptionInput,
    YoutubeUrlInput,
    ConfirmButton,
    DeleteButton,
    TagsEditor,
    VForm
  },

  props: {
    editing: { type: Boolean, default: false },

    request: { type: Function, default: null },

    deleting: {type: Function, default: null }
  },

  inject: [ '$target' ],

  data() {
    return {
      link: ''
    }
  },

  computed: {
    target() {
      return this.$target();
    },

    withDefault() {
      return this.target && this.editing;
    },

    description() {
      return this.withDefault ? this.target.description : '';
    }
  },

  mounted() {
    this.link = this.withDefault ?  
      'https://youtube.com/watch?v=' + this.target.youtubeId : '';
  },

  beforeDestroy() {    
    bus.dispatch('preview-changed', { videoId: null });
  },

  methods: {
    updatedLink(event) {
      let videoId = event.videoId || null;
      bus.dispatch('preview-changed', { videoId });
    },

    hasChanges() {
      let form = this.$refs.form;

      return form.hasChanges();
    },

    async submit(data) {
      if (this.request)
        await this.request(data);

      bus.dispatch('preview-changed', { videoId: null });
    },

    async deleteVideo() {
      function okay() {
        if (typeof _this.deleting !== 'function')
          return;

        let form = _this.$refs.form;
        if (!!!form)
          return;

        form.sendWith(async () => {
          let post = _this.target;
          await _this.deleting(post);

          bus.dispatch('post-deleting', { post })
        });
      }

      let _this = this;

      
      bus.dispatch('alert-warning', { 
        okay, message: 'It cannot be restored in the future',
      });
    }
  }
}
</script>