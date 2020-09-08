<template>
    <div class="editor">
        <form 
            class="editor__form"
            ref="form"
            @submit.prevent='submit' >
            
            <div class="editor__header">
                <h5 class="editor__title text-third">{{ formTitle }}</h5>
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
import EditingState from '@states/video/editing';
import CreationState from '@states/video/creation';

const MAX_DESCRIPTION_LENGTH = 180;
const MAX_URL_LENGTH = 180;

export default {
    name: 'video-editor',

    components: {
        TagEditor
    },

    props: {
        target: {
            type: Object,
            default: false
        }
    },

    data: function () { 
        return {
            url: '',
            urlError: '',
            
            description: '',
            descriptionError: '',

            state: null
        }
    },

    computed: {
        descriptionCounter() {
            return this.description.length + '/' + MAX_DESCRIPTION_LENGTH;
        },

        descriptionMaxLength() {
            return MAX_DESCRIPTION_LENGTH;
        },

        formTitle() {
            return this.state ? this.state.getTitle() : ''; 
        }
    },

    watch: {
        target(value) {
            if (value)
                this.state = new EditingState(this, value);
            else 
                this.state = new CreationState(this);
        }

    },

    mounted() {
        if (this.target)
            this.state = new EditingState(this, this.target);
        else 
            this.state = new CreationState(this);
    },

    beforeDestroy() {
        this.clear();

        this.stateCreate();
    },

    methods: {
        clear() {
            let form = this.$refs.form;

            if (form)
                this.$refs.form.reset();

            this.url = '';
            this.urlError = '';
            
            this.description = '';
            this.descriptionError = '';

            this.$options.postID = null;

            let tags = this.$refs.tags;

            tags.clear();
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

        stateCreate() {
            this.state = new CreationState(this);
        },

        stateEdit(event) {
            this.state = new EditingState(this, event.post);
        },

        onServerError() {
            bus.dispatch('alert-error', { message: `An unexpected error has occurred on 
                                                    the server. Please try again later` });
        },
        
        onVideoCreated(post) {
            bus.dispatch('post-created', { post });
            bus.dispatch('post-selecting', { post  });
        },

        onVideoEdited(post) {
            bus.dispatch('post-edited', { post });
            bus.dispatch('post-selecting', { post  });
        },

        async submit () {
            if (this.state)
                await this.state.submit();
        }
    }
}
</script>
