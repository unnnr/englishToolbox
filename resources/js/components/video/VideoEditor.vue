<template>
    <div class="editor">
        <!-- <div class="editor__alert">
            <p class="editor__alert-text text-fifth">Error:<span>your error here</span></p>
        </div> -->
        <form @submit='submit' class="editor__form" ref="form">
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
                        <small class="editor__counter">0/180</small>
                    </span> 
                    <small class="editor__error">Your error here</small>
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
import getYouTubeID from 'get-youtube-id';
import bus from '@services/eventbus';
import TagEditor from '@components/tags/TagEditor';
import Posts from '@services/Posts'
import Tags from '@services/Tags'

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
            

            bus.dispatch('editor-link-changed', { 
                url: this.url,
                videoID: videoID
            });
        },

        async submit (event) {

            event.preventDefault();

            let videoID = getYouTubeID(this.url)
            if (!!!videoID)
            {
                console.error('Icorrect url');
                return;
			}

            /*createdTagsData = [
                {label: 'asds', color: 'blacl', selected: 'true'}
            ] */
            let newTags = [];
            let createdTagsData = this.$refs.tags.createdTags;
            let loadedTagsData = this.$refs.tags.selectedOfloaded;
            
            if (createdTagsData.length)
            {
                newTags = await Tags.create(createdTagsData);

                if (!!!newTags)
                {
                    console.error('Error');
                    return;
                }
            }

            if (newTags.length)
                bus.dispatch('createdTags', { newTags });

            let data = new FormData(this.$refs.form);

            let post = await Posts.create(data, [...loadedTagsData, ...newTags]);
            if (!!!post)
                return;

            bus.dispatch('post-created', { post });
            bus.dispatch('post-selected', { post  });
        }
    }
}
</script>
