<template>
    <div class="tags">
        <h4 class="tags__title text-fourth">Add tags<small class="editor__counter">0/5</small></h4>
            
            <button class="tag tag--new tag--new-active" type="button">
                <label class="tag__label tag__label--new" for="tn1">
                    <span class="material-icons-round">add</span>
                </label>
                <input class="tag__input" id="tn1" type="text" placeholder="newTag">
            </button>


            <button class="tag" type="button"
                v-for="({ label, color }, index) in tags"
                :key="index"
                :style="{ 'background-color': color }">
            <span class="tag__name" for="cb2">{{ label}}</span>
        </button>

            <div class="space"></div>
        </div>
</template>

<script>
import PostService from '../../services/PostService'

export default {
    name: 'tag-list',

    data: function () {
        return {
            tags: []
        }
    },

    mounted() {
        this.load();
    },

    methods: {
        async load() {
            this.tags =  [
                {label: 'asddasd', color:'red'},
                {label: 'asddasd', color:'green'}
            ];
        }
    }
}
</script>