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
                    ref="audio"
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
                            name="imageFile"
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
                            name="audioFile"
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

    props: {
        target: {
            type: Object,
            default: false
        }
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

            for (let label of ['image', 'audio'])
            {
                let object = this[label + 'UrlObject'];

                if (object)
                    URL.revokeObjectURL(object);
            }
         
            this.audio.title =  '';
            this.audio.description =  '';
            this.audio.imageLabel =  '';
            this.audio.audioLabel =  '';

            this.errors.title = '';
            this.errors.description = '';
            this.errors.files = '';
        },

        stateCreate() {
            this.state = new CreationState(this);
        },

        stateEdit(event) {
            this.state = new EditingState(this, event.post);
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
            if (!!!this.state)
                return;

            this.state.updateAudio();
               
            let url = this.fileToUrl('audio');


            bus.dispatch('editor-audio-changed', { audioUrl: url});
        },

        updateImage() {
            if (!!!this.state)
                return;
            
            this.state.updateImage();
            
            let url = this.fileToUrl('image');

            bus.dispatch('editor-image-changed', { imageUrl: url});
        },

        fileToUrl(ref) {
            let propName = ref + 'UrlObject';

            if(this[propName])
                URL.revokeObjectURL(this[propName]);

            let file = this.$refs[ref].files[0];
            let url  = URL.createObjectURL(file)

            this[propName] = url;

            return url;
        },

        submit () {
            if (this.state)
                this.state.submit();
        }
    }
}

</script>
