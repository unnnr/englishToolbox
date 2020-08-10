<template>
    <div class="description">
        <div class="description__header">
            <h5 class="description__title heading-fifth">{{ title }}</h5>
            <button class="description__mobile-button"><span class="material-icons-round">arrow_drop_down</span></button>
        </div>

        <div class="description__body">
            <p class="description__text text-fourth">{{ description }}</p>
            <div class="description__tags">
                <h3 class="description__tags-title heading-fifth">Tag list</h3>
                <span class="description__tag description__tag--main">nisiQuisEleifend</span>
                <span class="description__tag description__tag">tortorCondimentum</span>
                <span class="description__tag description__tag">nequeLaoreet</span>
                <span class="description__tag description__tag">maurisPellentesque</span>
                <span class="description__tag description__tag">justoLaoreet</span>
            </div>
        </div>

        <div class="description__footer">
            <time class="description__date">{{ date }}</time>
            
            <div class="description__views">
                <span class="description__views-icon material-icons-round">visibility</span>
                <span class="description__views-count">{{ views }}</span>
            </div>
        </div>
    </div>

    
</template>

<script>
export default {
    name: 'video-info',

    /* props:{
        title: {
            type: String,
            default: 'Title'
        },

        date: {
            type: String,
            default: 'April 17 2020'
        },

        views: {
            type: Number,
            default: 1289
        },

        description: {
            type: String,
            default: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Nisi quis eleifend quam adipiscing vitae proin sagittis. Eu mi bibendum neque egestas
                        congue quisque egestas diam in. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus.`
        }
    }, */

    data: function () {
        return {
            title: 'Lorem ipsum dolor',
            date: 'April 17 2020',
            views: 1289,
            description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                           dolore magna aliqua. Nisi quis eleifend quam adipiscing vitae proin sagittis. Eu mi bibendum neque egestas
                           congue quisque egestas diam in. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus.`
        }
    }
}
</script>
