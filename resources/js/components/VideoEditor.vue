<template>
    <div class="editor">
        <form class="editor__form">
            <div class="editor__header">
                <h5 class="editor__title text-third">New video</h5>
            </div>
            <div class="editor__body" action="">
                <label class="editor__label text-fourth" for="">
                    {{ link }}
                </label>
                <input class="editor__input input-second" type="text" placeholder="https://...">
                <label class="editor__label text-fourth" for="">
                    {{ description }}<small class="editor__counter">0/180</small>
                </label>
                <textarea class="editor__textarea textarea-second" placeholder="place for your description"></textarea>
                <tag-list></tag-list>
            </div>
            <div class="editor__footer">
                <button class="editor__button button-second">confirm</button>
            </div>
        </form>
    </div>
</template>

<script>

import TagList from './TagList.vue';

export default {
    name: 'video-editor',

    data: function () {
        return {
            description: 'Custom description',
            link: 'YouTube link'
        }
    },

    components: {
        TagList
    }
}
</script>
