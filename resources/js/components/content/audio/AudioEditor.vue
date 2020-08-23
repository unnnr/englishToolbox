<template>
    <div class="editor">
        <form
            ref="form"
            class="editor__form"
            @submit.prevent="submit">

            <div class="editor__header">
                <h5 class="editor__title text-third">{{ formTitle }}</h5>
            </div>
            <div class="editor__body" action="">
                <label class="editor__label text-fourth" for="">
                    <span>
                        Title
                        <small class="editor__counter">{{ titleCounter }}</small>
                    </span> 
                    <small class="editor__error">{{  errors.title }}</small>
                </label>
                <input 
                    type="text"
                    name='title'
                    class="editor__input input-second"
                    placeholder="place for your title"
                    autocomplete="off"
                    required
                    v-model="audio.title"
                    :maxlength="titleMaxLength">
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
                    v-model="audio.description"
                    :maxlength="descriptionMaxLength">
                </textarea>
                <label class="editor__label text-fourth" for="">
                    <span>Upload files</span> 
                    <small class="editor__error">{{  errors.files }}</small>
                </label>
                <div class="editor__upload">
                    <label class="editor__input-group editor__input-group--image" for="image">
                        <span class="editor__file-placeholder text-sixth">{{ audio.imageLabel }}</span>
                        <input 
                            id="image"
                            ref='image'
                            type="file"
                            name="thumbnail"
                            class="editor__file-input"
                            accept="image/*"
                            :required='isRequired'
                            @change="updateImage">
                    </label>
                    <label class="editor__input-group editor__input-group--audio" for="audio">
                        <span class="editor__file-placeholder text-sixth">{{ audio.audioLabel }}</span>
                        <input
                            id="audio" 
                            ref="audio"
                            type="file"
                            name="audio"
                            class="editor__file-input"
                            accept="audio/*"
                            :required='isRequired'
                            @change="updateAudio">
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
import Tags from '@models/Tags'
import EditingState from '@states/audio/editing';
import CreationState from '@states/audio/creation';

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

            audio: {
                title: '',
                description: '', 
                imageLabel: '',
                audioLabel: ''
            },

            errors : {
                title: '',
                description: '',
                files: '',
            },

            state: null
        }
    },

    computed: {

        titleCounter() {
            return this.audio.title.length + '/' + MAX_TITLE_LENGTH;
        },

        titleMaxLength() {
            return MAX_TITLE_LENGTH;
        },

        descriptionCounter() {
            return this.audio.description.length + '/' + MAX_DESCRIPTION_LENGTH;
        },

        descriptionMaxLength() {
            return MAX_DESCRIPTION_LENGTH;
        },

        isRequired() {
            return this.state ? this.state.isFieldsRequired() : false;
        },

        formTitle() {
            return this.state ? this.state.getTitle() : ''; 
        }
    },

    mounted() {
        bus.listen('post-editing', event => {
        
            this.state = new EditingState(this, event.post);
        });

        bus.listen('post-creating', event => {
            
            this.state = new CreationState(this);
        });
        
        this.state = new CreationState(this);
    },

    methods: {

        clear() {
            this.audio.title =  '';
            this.audio.description =  '';
            this.audio.imageLabel =  '';
            this.audio.audioLabel =  '';

            this.errors.title = '';
            this.errors.description = '';
            this.errors.files = '';
        },

        onAudioCreated(post) {
            bus.dispatch('post-created', { post });
            bus.dispatch('post-selecting', { post  });
        },

         onAudioEdited(post) {
            bus.dispatch('post-edited', { post });
            bus.dispatch('post-selecting', { post  });
        },

        updateAudio() {
            if (this.state)
                this.state.updateAudio();
        },

        updateImage() {
            if (this.state)
                this.state.updateImage();
        },

        submit () {
            if (this.state)
                this.state.submit();
        }
    }
}

</script>
