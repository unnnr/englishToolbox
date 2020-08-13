<template>
    <div class="editor">
        <form @submit='submit' class="editor__form" ref="form">
            <div class="editor__header">
                <h5 class="editor__title text-third">New video</h5>
            </div>
            <div class="editor__body" action="">
                <label class="editor__label text-fourth" for="">
                    YouTube link
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
                    Custom description<small class="editor__counter">0/180</small>
                </label>
                <textarea class="editor__textarea textarea-second" placeholder="place for your description" name="description"></textarea>
                <tag-editor ref="tags"/>
            </div>
            <div class="editor__footer">
                <button class="editor__footer-button button-second">confirm</button>
            </div>
        </form>
    </div>
</template>

<script>
import bus from '../../eventbus';
import getYouTubeID from 'get-youtube-id';
import Posts from '../../services/Posts'
import TagEditor from '../tags/TagEditor';

export default {
    name: 'video-editor',

    data: function () { 
        return {
            url: '',
            description: ''
        }
    },

    components: {
        TagEditor
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
            

            bus.dispatch('editor-link-changed', { url: this.url, videoID: videoID});
        },

        async submit (event) {
            event.preventDefault();

            let videoID = getYouTubeID(this.url)
            if (!!!videoID)
            {
                console.error('Icorrect url');
                return;
			}

            let data = new FormData(this.$refs.form);

            let post = await Posts.create(data);
            if (!!!post)
                return;
                
            // console.log(this.$refs.tags.selected);
            
            bus.dispatch('post-created', { post });
            bus.dispatch('post-selected', { post  });
        }
    }
}
</script>
