<template>
    <div class="editor">
            <!-- <div class="editor__alert">
                <p class="editor__alert-text text-fifth">Error:<span>your error here</span></p>
            </div> -->
        <form 
            class="editor__form"
            ref="form"
            @submit.prevent='submit' >
            
            <div class="editor__header">
                <h5 class="editor__title text-third">New video</h5>
            </div>
            <div class="editor__body" action="">
                <label class="editor__label text-fourth" for="">
                    <span>
                        YouTube link
                    </span> 
                    <small class="editor__error">{{ urlError }}</small>
                </label>
                <input class="editor__input input-second"
                       type="text"
                       placeholder="https://..."
                       name="videoUrl"
                       required
                       v-model="url"
                       @keyup.enter="updateLink"
                       @blur='updateLink'>
                <label class="editor__label text-fourth" for="">
                    <span>
                        Custom description
                        <small class="editor__counter">{{ descriptionCounter }}</small>
                    </span> 
                    <small class="editor__error">{{ descriptionError }}</small>
                </label>
                <textarea 
                    class="editor__textarea textarea-second"
                    placeholder="place for your description"
                    name="description"
                    v-model="description"
                    :maxlength = "descriptionMaxLength">
                </textarea>
                <tag-editor ref="tags"/>
            </div>
            <div class="editor__footer">
                <button class="editor__footer-button button-second">confirm</button>
            </div>
        </form>
    </div>
</template>

<script>

import getYouTubeID from 'get-youtube-id';
import bus from '@services/eventbus';
import Posts from '@models/Posts'
import Tags from '@models/Tags'
import TagEditor from '@components/tags/TagEditor';

const MAX_DESCRIPTION_LENGTH = 180;
const MAX_URL_LENGTH = 180;

export default {
    name: 'video-editor',

    components: {
        TagEditor
    },

    data: function () { 
        return {
            url: '',
            urlError: '',
            
            description: '',
            descriptionError: ''
        }
    },

    computed: {

        descriptionCounter() {
            return this.description.length + '/' + MAX_DESCRIPTION_LENGTH;
        },

        descriptionMaxLength() {
            return MAX_DESCRIPTION_LENGTH;
        }
    },

    mounted() {
        bus.listen('post-editing', event => {

            let post = event.post;

            this.url = 'https://youtube.com/watch?v=' + post.videoID;
            this.description = post.description || '';

            let tags=  this.$refs.tags;

            tags.clear();
            tags.selected = post.tags;

            if (!!!post.mainTag.default)
                tags.main = tags.getTagById(post.mainTag.id);

            this.$options.postID = post.id;
            this.onSumbit = this.editVideo;
        });

        bus.listen('post-creating', event => {
            
            this.clear();
            this.$refs.tags.clear();

            this.onSumbit = this.createVideo;
		});
    },

    methods: {

        clear() {
            this.url = '';
            this.urlError = '';
            
            this.description = '';
            this.descriptionError = '';

            this.$options.postID = null;
        },

        updateLink () {
            if (this.url.length === 0 || this.$options.previousUrl === this.url)
                return;

            this.$options.previousUrl = this.url;
            
            let videoID = this.validateVideo();
            
            if (videoID)
                bus.dispatch('editor-link-changed', { 
                    url: this.url,
                    videoID: videoID
                });
        },

        validateVideo() {

            let videoID = getYouTubeID(this.url)
            if (!!!videoID)
            {
                this.urlError = 'Incorrect youtube link';
                return false;
            }
            
            this.urlError = '';

            return videoID;
        },

        getFormData() {
            
            let data = new FormData(this.$refs.form);

            let tags = this.$refs.tags.selected;
            for (const [index, tag] of tags.entries())
                data.append(`tags[${index}]`, tag.id);
            
            let mainTag = this.$refs.tags.main;
            if (mainTag)
                data.append('mainTag', mainTag.id);

            return data;
        },

        async createVideo(data) {

            let post = await Posts.create(data);

            bus.dispatch('post-created', { post });
            bus.dispatch('post-selecting', { post  });
        },

        async editVideo(data) {

            let id = this.$options.postID;
            let post = await Posts.edit(id, data);

            console.log(post);
            
            bus.dispatch('post-edited', { post });
            bus.dispatch('post-selecting', { post  });
        },

        async submit (event) {

            let data = this.getFormData();

            try {
                if (this.onSumbit)
                    await this.onSumbit(data);
            }
            catch(error) {
                console.log(error);

                if (error.status == 422 )
                {
                    let errors = error.body.errors;

                    if (errors.videoUrl)
                        this.urlError = errors.videoUrl.join('. ');
                        
                    if (errors.description)
                        this.descriptionError = errors.description.join('. ')
                }
            };

          
        }
    }
}
</script>
