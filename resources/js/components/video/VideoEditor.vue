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
                       v-model="url"
                       name="url"
                       required
                       @keyup.enter="updateLink"
                       @blur='updateLink'>
                <label class="editor__label text-fourth" for="">
                    Custom description<small class="editor__counter">0/180</small>
                </label>
                <textarea class="editor__textarea textarea-second" placeholder="place for your description" name="description"></textarea>
                <tag-list></tag-list>
            </div>
            <div class="editor__footer">
                <button class="editor__footer-button button-second">confirm</button>
            </div>
        </form>
    </div>
</template>

<script>
import getYouTubeID from 'get-youtube-id';
import bus from '../../eventbus';
import PostService from '../../services/PostService'
import TagList from '../TagList.vue';

export default {
    name: 'video-editor',

    data: function () { 
        return {
            url: '',
            description: ''
        }
    },

    components: {
        TagList
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
            
            console.log('suc');

            bus.dispatch('editor-link-changed', { url: this.url, id: videoID});
        },

        submit (event) {
            event.preventDefault();

            let videoID = getYouTubeID(this.url)
            if (!!!videoID)
            {
                console.error('Icorrect url');
                return;
			}

            let data = new FormData(this.$refs.form);

            data.set('id',  videoID);

            let post = PostService.createPost(data);

            bus.dispatch('post-created', { post });
            bus.dispatch('post-selected', { post  });
        }
    }
}
</script>
