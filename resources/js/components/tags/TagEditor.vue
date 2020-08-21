<template>
    <transition-group name="tags" class="tags" ref="tags">
        <h4 class="editor__label tags__title text-fourth" :key="-2">
            <span>
                Add tags
                <small class="editor__counter">{{ tagsCounter }}</small>
            </span>
            <small class="editor__error">{{ errorMessage }}</small>
        </h4>
            
        <new-tag-input
            ref="input"
            :key="-1"
            :submit="submit"/>

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
            :key="tag.id"
            v-context:items="contextMenu"
            :class="{ 'tag--main': tag.main }"
            :style="{ 'background-color': tag.selected || tag.main ? tag.color : ''}"
            @click="toggle(tag)"
            @click.right="createContext(tag)">
            
            <span class="tag__name" for="cb2">{{ tag.label }}</span>
        </button>
    </transition-group>
</template>

<script>

import NewTagInput from '@components/tags/NewTagInput'
import Tags from '@models/Tags'
import bus from '@services/eventbus';

const MAX_TAGS_COUNT = 5;
const MAX_CREATED_TAGS_COUNT = 30;

export default {
    name: 'tag-editor',

    components: {
        NewTagInput
    },

    data: function () {
        return {
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

        selected: {
          
            get() {

                let selected = [];

                for (const tag of [...this.loadedTags, ...this.createdTags])
                {
                    if (tag.selected && !!!tag.main)
                        selected.push(tag);
                }

                console.log('seeeleceted', selected);

                return [...selected];
            },

            set(tags) {
                
                if (tags.length > MAX_TAGS_COUNT - 1) // -1 Cause 1 is reserved for main tag
                    return;
                
                for (let tag of this.selected)
                    tag.selected = false;
               
                for (let { id } of tags)
                {
                    let tag = this.getTagById(id);

                    this.$set(tag, 'selected', true);
                }
            }
        },
        
        reversedCreatedTags() {
            return [...this.createdTags].reverse();
        }
    },

    watch: {

        main(newTag, oldTag) {   
            if (oldTag)
                this.$set(oldTag, 'main', false);

            if (newTag)
                this.$set(newTag, 'main', true);
        }
    },

    mounted() {
        
        this.load();
    },

    methods: {

        getTagById(id) {

            for (const tag of [...this.loadedTags, ...this.createdTags])
            {
                if (tag.id === id)
                    return tag;
            }

            return null;
        },

        load() {
            Tags.onload(() => {
                this.main = null;
                this.selectedCount = 0;
                this.createdTags = [];
                this.loadedTags = Tags.all()
            });
        },

        clear() {
            // this.loadedTags = [];
            this.load();

        },

        createContext(tag) {

            const SET_AS_MAIN = 0;
            const DELETE = 1;

            if (tag.main)
            {
                this.contextMenu[SET_AS_MAIN].label = 'Make default';
                this.contextMenu[SET_AS_MAIN].action = () => {
                    this.main = null; 
                }
            }
            else
            {
                this.contextMenu[SET_AS_MAIN].label = 'Set as main';
                this.contextMenu[SET_AS_MAIN].action = () => {
                
                    if (tag.selected)
                    {
                        this.main = tag;
                        return;
                    }          

                    if (this.toggle(tag))
                        this.main = tag; 
                }
            }

        
        },

        toggle(tag) {

            let currentState = tag.selected;


            if (!!!currentState)
            {
                if (this.selectedCount >= MAX_TAGS_COUNT)
                    return false;

                if (!!!this.main)
                    this.main = tag;
            }
            else
            {
                if (tag.main)
                    this.main = null;
            }


            this.$set(tag, 'selected', !!!currentState);
            this.selectedCount += currentState ? -1 : 1;
            
            return true;
        },
 
        remove(tag) {
            
            let tagIndex = this.createdTags.indexOf(tag);

            this.createdTags.splice(tagIndex, 1);
        },

        async submit(event) {

            let label = this.$refs.input.label.trim();

            if (label.length === 0 || this.selectedCount >= MAX_CREATED_TAGS_COUNT)
                return;
            
            let data = new FormData();
            data.append('label', label);
            data.append('color',  '#' + Math.floor(Math.random()  * Math.pow(16, 6)).toString(16).padStart(6, '0'));


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
        }
    }
}
</script>

<style scoped>

.tags-enter
{
    transform: scale(0.5);
    opacity: 0;
}

.tags-enter-active
{
    transition: 
        transform .3s ease-in-out,
        opacity .4s ease-in-out;
}

</style>


<style scoped>

.tag:before {
    width: 0;
    margin-right: 0;
    content:'';
    transform: scale(0);
    transition: 
        transform .2s ease-in-out, 
        margin-right .2s ease-in-out, 
        width .2s ease-in-out;
}

.tag--main:before {
    width: 15px;
    margin-right: 5px;
    content: "star";
    transform: scale(1);
}

</style>
