<template>
    <div class="tags">
        <h4 class="tags__title text-fourth">Add tags<small class="editor__counter">{{ selectedCount }}/5</small></h4>
            
            <button 
                type="button"
                class="tag tag--new "
                :class="{'tag--new-active': inputIsActive }"
                @click="inputFocus">
                <label
                    class="tag__label tag__label--new"
                    for="tn1"
                    @click="inputClick">
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
                    @blur="inputBlured"
                    @focus="inputFocused"
                    @keydown.enter.stop="submit">
            </button>

            <button
                class="tag"
                type="button"
                v-for="(tag, index) of newTags"
                :key="'newtag_' + index"
                :style="{ 'background-color': tag.selected ? tag.color : ''}"
                @click="remove(tag)">
                <span class="tag__name" for="cb2">{{ tag.label }}</span>
            </button>

            <button
                class="tag"
                type="button"
                v-for="(tag, tagIndex) of tags"
                :key="tagIndex"
                :style="{ 'background-color': tag.selected ? tag.color : ''}"
                @click="toggle(tag)">
                <span class="tag__name" for="cb2">{{ tag.label }}</span>
            </button>

            <div class="space"></div>
        </div>
</template>

<script>

import Tags from '../../services/Tags'

const MAX_TAGS_COUNT = 5;

export default {
    name: 'tag-editor',

    data: function () {
        return {
            newLabel: '',
            tags: [],
            newTags: [],
            selectedCount: 0,
            inputIsActive: false
        }
    },

    computed: {
        selected() {

            let selected = [];

            for (const tag of this.tags)
            {
                if (tag.selected)
                    selected.push(tag);
            }

            return [...selected, ...this.newTags];
        },

        inputIsDisabled(){
            return !!!this.inputIsActive;
        }
    },

    watch: {
        newLabel() {
            this.checkInput();
        }
    },

    mounted() {
        this.load();
    },

    methods: {
        async load() {
            this.tags = await Tags.all();
        },

        toggle(tag) {

            let currentState = tag.selected;

            if (!!!currentState && this.selectedCount >= MAX_TAGS_COUNT)
                return;

            this.$set(tag, 'selected', !!!currentState);
            this.selectedCount += currentState ? -1 : 1; 
        },

        remove(tag) {
            let tagIndex = this.newTags.indexOf(tag);

            this.newTags.splice(tagIndex, 1);
            this.selectedCount--;
        },
        
        checkInput()
        {
            if (this.newLabel.length === 0 && !!!this.$options.inputIsFocused)
            {
                clearTimeout(this.$options.delayedTimer)
                this.inputIsActive = false;
            }
        },

        inputFocus()
        {
            this.$refs.input.focus();
        },

        inputBlured() {
            this.$options.delayTimer = setTimeout(() => {
                this.$options.inputIsFocused = false;
                this.checkInput();
            }, 200)
        },

        inputFocused() {

            clearTimeout(this.$options.delayTimer)
            this.$options.inputIsFocused = true;
        },

        inputClick(event)
        {
            // event.preventDefault();
            
            if (!!!this.inputIsActive)
            {
                let input =this.$refs.input;
/*                 this.$options.delayedTimer = 
                    setTimeout( () => input.focus(), 50);
 */
                this.inputIsActive = true;
                return;
            }

            this.submit(event);
        },

        submit(event) {

            event.preventDefault();

            let label = this.newLabel.trim();
            if (label.length === 0 || this.selectedCount >= MAX_TAGS_COUNT)
                return;

            this.selectedCount++;
            this.newLabel = '';
            this.newTags.push({
                label: label, 
                color: '#' + Math.floor(Math.random()  * Math.pow(16, 6)).toString(16).padStart(6, '0'),
                selected: true,
                isnew: true
            });

        }
    }
    

}
</script>