<template>
	<div class="editor">
		<request-form 
			class="editor__form"
			ref="form"
			:defaults='target'
			:submit-callback="submit"
			@input:incorrect="hadleErrors">
		
			<div class="editor__header">
				<h5 class="editor__title text-third">{{ formTitle }}</h5>
			</div>
			<div class="editor__body" action="">
				<label class="editor__label text-fourth" for="">
					<span>
						YouTube link
					</span> 
					<small class="editor__error">{{ errors.ulr }}</small>
				</label>
				<input class="editor__input input-second"
						type="text"
						placeholder="https://..."
						name="videoUrl"
						default="some"
						v-model="data.url"
						@keyup.enter="updateLink"
						@blur='updateLink'
						required>

				<label class="editor__label text-fourth" for="">
					<span>
						Custom description
						<small class="editor__counter">{{ descriptionCounter }}</small>
					</span> 
					<small class="editor__error">{{ errors.description }}</small>
				</label>

				<textarea 
					class="editor__textarea textarea-second"
					placeholder="place for your description"
					name="description"
					v-model="data.description"
					:maxlength = "descriptionMaxLength">
				</textarea>

				<tag-editor ref="tags"/>
			</div>

			<div class="editor__footer">
				<submit-button
					class="editor__footer-button button-second"
					ref="submitButton"
					:loading="isLoading()">
				</submit-button>
			</div>
		</request-form>
	</div>
</template>

<script>

import getYouTubeID from 'get-youtube-id'
import bus from '@services/eventbus'
import SubmitButton from '@components/SubmitButton'
import RequestForm from '@components/RequestForm'
import TagEditor from '@components/tags/TagEditor'
import HandleTagsData from '@mixins/HandleTagsData'
import Videos from '@models/Videos'

const MAX_DESCRIPTION_LENGTH = 180;
const MAX_URL_LENGTH = 180;

export default {
	components: {
		SubmitButton,
		RequestForm,
		TagEditor
	},

	mixins: [ HandleTagsData ],

	props: {
		target: {
			type: Object,
			default: null
		}
	},

	data: function () { 
		return {
			data: {
				url: 'someeoeoeoe',
				description: '',
			},

			errors: {
				url: '',
				description: ''
			}
		}
	},

	computed: {
		descriptionCounter() {
			return this.data.description.length + '/' + MAX_DESCRIPTION_LENGTH;
		},

		descriptionMaxLength() {
			return MAX_DESCRIPTION_LENGTH;
		},

		formTitle() {
			return this.editing ? 'Edit video' : 'New video'
		},

		editing() {
			return Boolean(this.target);
		}
	},

	watch: {
		target(value) {
			this.initState();
		}
	},

	mounted() {
		this.initState();
	},

	methods: {
		hadleErrors(errors) {
			if (errors.videoUrl)
				this.errors.url = errors.videoUrl.join('. ')  

			if (errors.description)
				this.errors.descriptions = errors.description.join('. ');
		},

		isLoading() {
			if (this.$refs.form)
				return this.$refs.form.loading;
		},

		clear() {
			let form = this.$refs.form;

			form.clear();
			
			Object.assign(this.data, {
				description: '',
				url: ''
			});

			Object.assign(this.errors, {
				description: '',
				url: ''
			});

			this.$options.postID = null;

			let tags = this.$refs.tags;

			tags.clear();
		},

		convertUrl() {
			let videoID = getYouTubeID(this.url);
			
			if (!!!videoID)
			{
				this.errors.url = 'Incorrect youtube link';
				return false;
			}
	
			this.errors.url = '';

			return videoID;
		},

		updateLink () {
			if (this.data.url.length === 0 || this.$options.previousUrl === this.url)
				return;

			this.$options.previousUrl = this.url;
			
			let videoID = this.convertUrl();
			
			if (videoID)
				bus.dispatch('editor-link-changed', { 
					url: this.url,
					videoID: videoID
				});
		},

    getFormData(nullable = false){
      let data = this.$refs.form.data;

      let tags = this.$refs.tags.selected;
      this.appendTagsData(data, tags, nullable);

      let mainTag = this.$refs.tags.main;
      this.appendMainTagData(data, mainTag, nullable);
            
      return data;
		},
		
		initState() {
			this.clear();

			if (this.editing)
			{
				Object.assign(this.data, {
					url: 'https://youtube.com/watch?v=' + this.target.youtubeId,
					description: this.target.description || ''
				});

				let tags = this.$refs.tags;
      	tags.selected = this.target.tags;

      	if (!!!this.target.mainTag.default)
      	    tags.main = tags.getTagById(this.target.mainTag.id);
			}
		},

		async createVideo() {
			let data = this.getFormData();
			let post = await Videos.create(data);
				
			bus.dispatch('post-created', { post });
			bus.dispatch('post-selecting', { post  });
		},

		async editVideo() {
			const NULLABLE = true;

			let data = this.getFormData(NULLABLE);
			let post = await Videos.edit(this.target.id, data);
			
			bus.dispatch('post-edited', { post });
			bus.dispatch('post-selecting', { post });
		},

		submit() {
			if (this.editing)
				return this.editVideo();

			return this.createVideo();
		}
	}
}
</script>