<template>
    <div class="editor">
            <!-- <div class="editor__alert">
                <p class="editor__alert-text text-fifth">Error:<span>your error here</span></p>
            </div> -->
        <form 
            class="editor__form"
            ref="form"
            @submit='submit' >
            
            <div class="editor__header">
                <h5 class="editor__title text-third">New video</h5>
            </div>
            <div class="editor__body" action="">
                <label class="editor__label text-fourth" for="">
                    <span>
                        YouTube link
                    </span> 
                    <small class="editor__error">Your error here</small>
                </label>
                <input class="editor__input input-second"
                       type="text"
                       placeholder="https://..."
                       name="video_url"
                       required
                       v-model="url"
                       @keyup.enter="updateLink"
                       @blur='updateLink'>
                <label class="editor__label text-fourth" for="">
                    <span>
                        Custom description
                        <small class="editor__counter">{{ descriptionCounter }}</small>
                    </span> 
                    <small class="editor__error">Your error here</small>
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
            description: ''
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

    methods: {
        updateLink () {
            if (this.$options.previousUrl === this.url)
                return;

            this.$options.previousUrl = this.url;
            
            let videoID = getYouTubeID(this.url);
            if (!!!videoID)
            {
                console.error('Icorrect url');
                return;
            }
            

            bus.dispatch('editor-link-changed', { 
                url: this.url,
                videoID: videoID
            });
        },

        validateVideo() {

            let videoID = getYouTubeID(this.url)
            if (!!!videoID)
            {
                console.error('Icorrect url');
                return false;
			}

            return true;
        },

        async createVideo() {

            let data = new FormData(this.$refs.form);
            let tags = this.$refs.tags.selected;

            for (const [index, tag] of tags.entries())
                data.append(`tags[${index}]`, tag.id);

            let post = await Posts.create(data);
            if (!!!post)
                return;

            bus.dispatch('post-created', { post });
            bus.dispatch('post-selected', { post  });
        },

        submit (event) {

            event.preventDefault();

            if (this.validateVideo())
                this.createVideo();
        }
    }
}
</script>
