<template>
    <transition-group name="tags" class="tags">
        <h4 
            class="tags__title text-fourth"
            :key="-2">

            Add tags<small class="editor__counter">{{ selectedCount }}/5</small>
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
            :key="tag.id"
            :style="{ 'background-color': tag.selected ? tag.color : ''}"
            @click="toggle(tag)">

            <span class="tag__name" for="cb2">{{ tag.label }}</span>
        </button>

        <button
            class="tag"
            type="button"
            v-for="(tag) of loadedTags"
            :key="tag.id"
            :style="{ 'background-color': tag.selected ? tag.color : ''}"
            @click="toggle(tag)">
            
            <span class="tag__name" for="cb2">{{ tag.label }}</span>
        </button>
    </transition-group>
</template>

<script>

import Tags from '@models/Tags'
import bus from '@services/eventbus';

const MAX_TAGS_COUNT = 5;
const MAX_CREATED_TAGS_COUNT = 30;
const BLUR_DELAY = 200;

export default {
    name: 'tag-editor',

    data: function () {
        return {
            inputIsActive: false,
            inputIsFocused: false,

            newLabel: '',
            selectedCount: 0,

            loadedTags: [],
            createdTags: []
        }
    },

    computed: {
        selected() {

            let selected = [];

            for (const tag of [...this.loadedTags, ...this.createdTags])
            {
                if (tag.selected)
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

        setUpInputAutoGrow() {
             
            let buffer = this.$refs.buffer;

            this.$refs.input.addEventListener('input', function() {
                this.nextElementSibling.innerHTML = this.value;
                this.style.width = this.nextElementSibling.clientWidth + 'px';
            });
        },

        toggle(tag) {

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

            let newTag = await Tags.create(data);

            this.inputIsActive = true;

            if (newTag)
            {
                this.newLabel = '';
                this.createdTags.push(newTag);
                bus.dispatch('tag-created', { tag: newTag });
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