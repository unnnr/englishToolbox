<template>
    <div class="editor__tags">
        <h4 class="editor__label text-fourth">Add tags<small class="editor__counter">0/5</small></h4>
            <div class="tag tag--new editor__tag">
                <label class="tag__icon" for="tag_new"></label>
                <input class="tag__input" type="text" placeholder="add new tag" id="tag_new">
            </div>
            <div class="tag tag--main editor__tag">
                <input class="tag__checkbox" type="checkbox" id="tag__checkbox_1">
                <label class="tag__checkbox-label" for="tag__checkbox_1">
                    <div class="tag__icon tag__icon--checkbox"></div>
                    <span class="tag__name tag__name--checkbox">nisiQuisEleifend</span>
                </label>
            </div>
            <div class="tag editor__tag">
                <input class="tag__checkbox" type="checkbox" id="tag__checkbox_2">
                <label class="tag__checkbox-label" for="tag__checkbox_2">
                    <div class="tag__icon tag__icon--checkbox"></div>
                    <span class="tag__name tag__name--checkbox">maurisPellentesque</span>
                </label>
            </div>
            <div class="tag editor__tag">
                <input class="tag__checkbox" type="checkbox" id="tag__checkbox_3">
                <label class="tag__checkbox-label" for="tag__checkbox_3">
                    <div class="tag__icon tag__icon--checkbox"></div>
                    <span class="tag__name tag__name--checkbox">tortorCondimentum</span>
                </label>
            </div>
            <div class="tag editor__tag">
                <input class="tag__checkbox" type="checkbox" id="tag__checkbox_4">
                <label class="tag__checkbox-label" for="tag__checkbox_4">
                    <div class="tag__icon tag__icon--checkbox"></div>
                    <span class="tag__name tag__name--checkbox">justoLaoreet</span>
                </label>
            </div>
            <div class="tag editor__tag">
                <input class="tag__checkbox" type="checkbox" id="tag__checkbox_5">
                <label class="tag__checkbox-label" for="tag__checkbox_5">
                    <div class="tag__icon tag__icon--checkbox"></div>
                    <span class="tag__name tag__name--checkbox">nequeLaoreet</span>
                </label>
            </div>
            <div class="space"></div>
          </div>
</template>

<script>
export default {
    name: 'tag-list'
}
</script>