<template>
    <div class="tags">
        <h4 class="tags__title text-fourth">Add tags<small class="editor__counter">0/5</small></h4>
            <!-- <div class="tag tag--new editor__tag">
                <label class="tag__icon" for="tag_new"></label>
                <input class="tag__input" type="text" placeholder="add new tag" id="tag_new">
            </div>
            <div v-for="(tag, index) of tags" :key="index"  class="tag tag--main editor__tag">
                <input class="tag__checkbox" type="checkbox" :id="'tag__checkbox_' + index">
                <label class="tag__checkbox-label" for="tag__checkbox_1">
                    <div class="tag__icon tag__icon--checkbox"></div>
                    <span class="tag__name tag__name--checkbox">{{ tag }}</span>
                </label>
            </div> -->
            
            <button class="tag tag--checkbox tag--main" type="button">
                <input class="tag__checkbox" id="cb1" type="checkbox">
                <label class="tag__label" for="cb1">isiQuisEleifend</label>
            </button>

            <button class="tag tag--checkbox tag--main" type="button">
                <input class="tag__checkbox" id="cb2" type="checkbox">
                <label class="tag__label" for="cb2">isiQuisEleifend</label>
            </button>

            <div class="space"></div>
        </div>
</template>

<script>
export default {
    name: 'tag-list',

    data: function () {
        return {
            tags: [
                'nisiQuisEleifend',
                'maurisPellentesque',
                'tortorCondimentum',
                'justoLaoreet',
                'nequeLaoreet'
            ]
        }
    }
}
</script>