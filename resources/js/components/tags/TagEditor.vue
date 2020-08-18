<template>
    <transition-group name="tags" class="tags" ref="tags">
        <h4 class="editor__label tags__title text-fourth" :key="-2">
            <span>
                Add tags
                <small class="editor__counter">{{ selectedCount }}/5</small>
            </span>
            <small class="editor__error">{{ errorMessage }}</small>
        </h4>
            
        <button 
            type="button"
            class="tag tag--new "
            :key="-1"
            :class="{
                'tag--new-active': inputIsActive,
                'tag--new-focused': inputIsFocused
            }"
            @click="onWrapperClick">

            <label
                class="tag__label tag__label--new"
                for="tn1"
                @click="onLabelClick">
                
                <span class="material-icons-round">add</span>
            </label>
            <input 
                id="tn1"
                ref="input"
                class="tag__input"
                type="text"
                placeholder="newTag"
                v-model="newLabel"
                :disabled="inputIsDisabled"
                @blur="onInputBlur"
                @focus="onInputFocus"
                @keydown.enter.prevent.stop="submit">
            <div class="tag__buffer" ref="buffer"></div>
        </button>

        <button
            class="tag tag--created"
            type="button"
            v-for="(tag) of reversedCreatedTags"
            v-context:items="contextMenu"
            :key="tag.id"
            :class="{ 'tag--main': tag.main }"
            :style="{ 'background-color': tag.selected || tag.main ? tag.color : ''}"
            @click="toggle(tag)"
            @click.right="createContext(tag)">

            <span class="tag__name" for="cb2">{{ tag.label }}</span>
        </button>

        <button
            class="tag"
            type="button"
            v-for="(tag) of loadedTags"
            v-context:items="contextMenu"
            :key="tag.id"
            :class="{ 'tag--main': tag.main }"
            :style="{ 'background-color': tag.selected || tag.main ? tag.color : ''}"
            @click="toggle(tag)"
            @click.right="createContext(tag)">
            
            <span class="tag__name" for="cb2">{{ tag.label }}</span>
        </button>
    </transition-group>
</template>

<script>

import Tags from '@models/Tags'
import bus from '@services/eventbus';

const MAX_TAGS_COUNT = 4;
const MAX_CREATED_TAGS_COUNT = 30;
const BLUR_DELAY = 200;

let main;

export default {
    name: 'tag-editor',

    data: function () {
        return {
            inputIsActive: false,
            inputIsFocused: false,

            newLabel: '',
            selectedCount: 0,

            main: null,
            loadedTags: [],
            createdTags: [],

            errorMessage: '',

            contextMenu: [
                { label: 'Set as main', action: () => {} }
            ]
        }
    },

    computed: {

        tagsCounter() {
            return this.selectedCount + '/' + MAX_TAGS_COUNT;
        },

        selected() {

            let selected = [];

            for (const tag of [...this.loadedTags, ...this.createdTags])
            {
                if (tag.selected && !!! tag.main)
                    selected.push(tag);
            }
            
            return [...selected];
        },

        inputIsDisabled(){
            return !!!this.inputIsActive;
        },
        
        reversedCreatedTags() {
            return [...this.createdTags].reverse();
        }
    },

    watch: {

        main(newTag, oldTag)
        {   
            if (oldTag)
                this.$set(oldTag, 'main', false);

            this.$set(newTag, 'main', true);
        },

        newLabel() {
            this.checkInput();
        }
    },

    mounted() {
        this.load();

        this.setUpInputAutoGrow();
    },

    methods: {
        async load() {
            this.loadedTags = await Tags.all();
        },

        createContext(tag) {

            const SET_AS_MAIN = 0;
            const DELETE = 1;

            this.contextMenu[SET_AS_MAIN].action = () =>
                this.main = tag;
        },

        setUpInputAutoGrow() {
             
            let buffer = this.$refs.buffer;

            this.$refs.input.addEventListener('input', function() {
                this.nextElementSibling.innerHTML = this.value;
                this.style.width = this.nextElementSibling.clientWidth + 'px';
            });
        },

        toggle(tag) {

            if (this.mainTag && this.mainTag.id === tag.id)
                return;

            let currentState = tag.selected;

            if (!!!currentState && this.selectedCount >= MAX_TAGS_COUNT)
                return;

            this.$set(tag, 'selected', !!!currentState);
            this.selectedCount += currentState ? -1 : 1; 
        },

        // New button methods

        onWrapperClick()
        {
            this.inputFocus();

            if (!!!this.inputIsActive)
                this.inputIsActive  = true;
        },

        onLabelClick()
        {
            this.inputFocus();

            if (!!!this.inputIsActive)
                return;

            this.inputIsActive  = false;
            this.submit();
        },

        onInputBlur() {
            this.$options.delayTimer = setTimeout(() => {
                this.inputIsFocused = false;
                this.checkInput();
            }, BLUR_DELAY)
        },

        onInputFocus() {

            clearTimeout(this.$options.delayTimer)
            this.inputIsFocused = true;
        },

        inputFocus() {
            this.$refs.input.focus();
        },
    
        remove(tag) {
            
            let tagIndex = this.createdTags.indexOf(tag);

            this.createdTags.splice(tagIndex, 1);
        },
        
        checkInput() {
            
            if (this.newLabel.length === 0 && !!!this.inputIsFocused)
            {
                clearTimeout(this.$options.delayedTimer)
                this.inputIsActive = false;
            }
        },

        async submit(event) {

            let label = this.newLabel.trim();
            if (label.length === 0 || this.selectedCount >= MAX_CREATED_TAGS_COUNT)
                return;
            
            let data = new FormData();
            data.append('label', label);
            data.append('color',  '#' + Math.floor(Math.random()  * Math.pow(16, 6)).toString(16).padStart(6, '0'));

            this.inputIsActive = false;

            try {
                let newTag = await Tags.create(data)

                this.errorMessage = '';
                this.newLabel = '';

                this.createdTags.push(newTag);

                bus.dispatch('tag-created', { tag: newTag });
            }
            catch(error) {
                
                console.log(error);

                if (error.status == 422 && error.body.errors.label)
                    this.errorMessage = error.body.errors.label.join('. ');
            }
            finally{
                this.inputIsActive = true;  
            }
        }
    }
}
</script>

<style scoped>

.tag__buffer {
    position: absolute;
    top: -1000px;
    left: -1000px;
    visibility: hidden;
    white-space: pre;
}

.tags-enter
{
    transform: scaleX(0);
}

.tags-enter-active
{
    transition: all .4s;
}

</style>