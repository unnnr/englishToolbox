<template>
    <div class="editor">
        <form
            ref="form"
            class="editor__form">

            <div class="editor__header">
                <h5 class="editor__title text-third">New audio</h5>
            </div>
            <div class="editor__body" action="">
                <label class="editor__label text-fourth" for="">
                    <span>
                        Title
                        <small class="editor__counter">{{ titleCounter }}</small>
                    </span> 
                    <small class="editor__error">{{ titleError }}</small>
                </label>
                <input 
                    type="text"
                    name='title'
                    class="editor__input input-second"
                    placeholder="place for your title"
                    autocomplete="off"
                    v-model="title"
                    :maxlength="titleMaxLength">
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
                    :maxlength="descriptionMaxLength">
                </textarea>
                <label class="editor__label text-fourth" for="">
                    <span>Upload files</span> 
                    <small class="editor__error">{{ filesError }}</small>
                </label>
                <div class="editor__upload">
                    <label class="editor__input-group editor__input-group--image" for="image">
                        <span class="editor__file-placeholder text-sixth">{{ imageName }}</span>
                        <input 
                            id="image"
                            ref='image'
                            type="file"
                            class="editor__file-input"
                            accept="audio"
                            @change="updateFileName('image')">
                    </label>
                    <label class="editor__input-group editor__input-group--audio" for="audio">
                        <span class="editor__file-placeholder text-sixth">{{ audioName }}</span>
                        <input
                            id="audio" 
                            ref="audio"
                            type="file"
                            class="editor__file-input"
                            accept="image"
                            @change="updateFileName('audio')">
                    </label>
                </div>

                <tag-editor ref="tags"/>
            </div>
            <div class="editor__footer">
                <button class="editor__footer-button button-second">confirm</button>
            </div>
        </form>
    </div>
</template>

<script>

// Modules
import getYouTubeID from 'get-youtube-id';

// Logic
import bus from '@services/eventbus';
import Posts from '@models/Posts'
import Tags from '@models/Tags'

//Components
import TagEditor from '@components/tags/TagEditor';

const MAX_TITLE_LENGTH =  50;
const MAX_DESCRIPTION_LENGTH = 180;

export default {
    name: 'audio-editor',

    components: {
        TagEditor
    },

    data: function () { 
        return {
            title: '',
            titleError: '',

            description: '',
            descriptionError: '',

            imageName: 'image',
            audioName: 'audio',

            filesError: ''
        }
    },

    computed: {

        titleCounter() {
            return this.title.length + '/' + MAX_TITLE_LENGTH;
        },

        titleMaxLength() {
            return MAX_TITLE_LENGTH;
        },

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

         

            let tags = this.$refs.tags;

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
          
        },

        updateFileName( label ) {
            
            let input =  this.$refs[label];

            if (!!!input.files.length)
            {
                this[label + 'Name'] = label;
                return;
            }

            let fileName = input.files[0].name;

            this[label + 'Name']  = fileName;
        },

        getFormData() {
            
            let data = new FormData(this.$refs.form);


            return data;
        },

        async creatAudio(data) {


        },

        async editAudio(data) {

            bus.dispatch('post-edited', { post });
            bus.dispatch('post-selecting', { post  });
        },

        async submit (event) {

            let data = this.getFormData();

            try 
            {
                if (this.onSumbit)
                    await this.onSumbit(data);
            }
            catch(error) 
            {
                console.log(error);

                if (error.status == 422 )
                {
                   
                }
            };

          
        }
    }
}
</script>
