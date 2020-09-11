<template>
    <section class="updates container">
      <div class="feed">
        <h3 class="feed__title heading-third">Latest updates</h3>

            <swiper
                ref="swiper"
                :options="swiperOptions"
                :style="{
                    'width': '100%',
                    'background-color': 'none'}">

                    <swiper-slide
                        v-for="card in updates"
                        :key="card.id">
                       
                        <card 
                            :title="card.title"
                            :description="card.description"
                            :created-at="card.createdAt"
                            :imageUrl="card.thumbnail"

                        square-form
                        margined/>
                    </swiper-slide>

                    <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </section>
</template>

<script>

import Card from '@components/cards/Card';
import Updates from '@models/Updates';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import { Swiper as SwiperClass, Pagination, Autoplay } from 'swiper/core'
import 'swiper/swiper-bundle.css'

SwiperClass.use([Pagination, Autoplay])
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
    name: 'updates-container',

    components: {
        SwiperSlide,
        Swiper,
        Card
    },

    data: function() {
        return {
            updates: [
                {id: 1},
                {id: 2}, 
                {id: 3}, 
                {id: 4},
                {id: 5},
                {id: 6}, 
                {id: 7}, 
                {id: 8},
                {id: 9},
                {id: 10}, 
                {id: 11}, 
                {id: 12},
            ],
            
            swiperOptions: {
                slidesPerView: 'auto',

                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                }
            }
        }
    },  

    beforeMount() {
        /* Updates.onload(() => {
            this.updates = Updates.all();  
        }); */
    },

    methods: {

    }
}
</script>

<style>
.swiper-slide {
    width: auto;
}
 
</style>