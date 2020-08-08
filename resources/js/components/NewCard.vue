<template>
    <div class="card card--add card--margin">
    <button class="card__image" @click="onClick">
    <span class="card__add-icon material-icons-round">add</span>
    <div class="card__title heading-fifth">Add new {{ postType }}</div>
        </button>
    </div>
</template>

<script>
import bus from '../eventbus';

export default {
    name: 'new-card',
    
    props: {
        postType: {
            type: String,
            default: 'post'
        }
    },

    methods: {
        onClick: function () {
            bus.dispatch('post-created');
        }
    }
}
</script>