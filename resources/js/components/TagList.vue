<template>
    <div class="tags">
        <h4 class="tags__title text-fourth">Add tags<small class="editor__counter">0/5</small></h4>
            
            
            <button class="tag tag--new tag--new-active" type="button">
                <label class="tag__label tag__label--new" for="tn1">
                    <span class="material-icons-round">add</span>
                </label>
                <input class="tag__input" id="tn1" type="text" placeholder="newTag">
            </button>


            <button class="tag tag--checkbox tag--main" type="button">
                <label class="tag__label" for="cb1">isiQuisEleifend</label>
                <input class="tag__checkbox" id="cb1" type="checkbox">
            </button>

            <button class="tag tag--checkbox" type="button">
                <label class="tag__label" for="cb2">isiQuisEleifend</label>
                <input class="tag__checkbox" id="cb2" type="checkbox">
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