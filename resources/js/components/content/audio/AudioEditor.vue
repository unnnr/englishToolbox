<template>
    <div class="editor">
        <form
            ref="form"
            class="editor__form"
            @submit.prevent="submit">

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
                    required
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
                            name="thumbnail"
                            class="editor__file-input"
                            accept="image/*"
                            required
                            @change="updateFileName('image')">
                    </label>
                    <label class="editor__input-group editor__input-group--audio" for="audio">
                        <span class="editor__file-placeholder text-sixth">{{ audioName }}</span>
                        <input
                            id="audio" 
                            ref="audio"
                            type="file"
                            name="audio"
                            class="editor__file-input"
                            accept="audio/*"
                            required
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
import Audio from '@models/Audio'
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

            tags.selected = post.tags;

            if (!!!post.mainTag.default)
                tags.main = tags.getTagById(post.mainTag.id);

            this.$options.postID = post.id;
            this.onSumbit = this.editAudio;
        });

        bus.listen('post-creating', event => {
            
            this.clear();
            this.$refs.tags.clear();

            this.onSumbit = this.createAudio;
		});
    },

    methods: {

        clear() {
            this.title =  '';
            this.titleError =  '';

            this.description =  '';
            this.descriptionError =  '';

            this.imageName =  'image';
            this.audioName =  'audio';

            this.filesError =  ''; 

            let tags = this.$refs.tags;

            tags.clear();
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

        getFormData(nullableMainTag = false) {
            
            let data = new FormData(this.$refs.form);

            let tags = this.$refs.tags.selected;
            for (const [index, tag] of tags.entries())
                data.append(`tags[${index}]`, tag.id);
            
            let mainTag = this.$refs.tags.main;
            if (mainTag)
                data.append('mainTag', mainTag.id);
            
            else if (nullableMainTag)
                data.append('mainTag', '');

            return data;
        },

        async createAudio() {

            let data = this.getFormData();
            let post = await Audio.create(data);


            console.log(post);
            bus.dispatch('post-created', { post });
            bus.dispatch('post-selecting', { post  });
        },

        async editAudio() {
             
            let data = this.getFormData();
            let post = await Audio.create(data);

            bus.dispatch('post-edited', { post });
            bus.dispatch('post-selecting', { post  });
        },

        async submit (event) {
            try 
            {
                if (this.onSumbit)
                    await this.onSumbit();
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
