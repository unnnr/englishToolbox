<template>
  <v-form 
    class="i-recommend__card i-recommend__card--editor"
    ref="form"
    :request="request"
    :prevent-redundant="!!!editing"
    secondary>

    <recommendation-thumbnail
      :default-value="image"
      :optinal="editing"/>

    <title-input 
      class="i-recommend__card-title-input"
      :default-value="title"/>

    <description-input 
      class="i-recommend__card-textarea"
      :default-value="description"
      :autoGrow="false"
      :max="256"
      required/>

    <link-input 
      class="i-recommend__card-link-input"
      :default-value="link"/>

    <confirm-button
       class="i-recommend__card-button"/>

    </v-form>
</template>

<script>
import RecommendationThumbnail from '@components/inputs/RecommendationThumbnail'
import DescriptionInput from '@components/inputs/DescriptionInput'
import ConfirmButton from '@components/buttons/ConfirmButton'
import TitleInput from '@components/inputs/TitleInput'
import LinkInput from '@components/inputs/LinkInput'
import VForm from '@components/validation/VForm'

export default {
  components: {
    RecommendationThumbnail,
    DescriptionInput,
    ConfirmButton,
    TitleInput,
    LinkInput,
    VForm
  },

  props: {
    request: { type: Function, default: null },

    target: { type: Object, default: null },
  },

  computed: {
    editing() {
      return Boolean(this.target);
    },

    description() {
      return this.target ? this.target.description : '';
    },

    title() {
      return this.target ? this.target.title : '';
    },

    image() {
      return this.target ? this.target.image : '';
    },

    link() {
      return this.target ? this.target.link : '';
    },
  },

  methods: {
    reset() {
      let form = this.$refs.form;
      if (form)
        form.reset();
    }
  }
}
</script>