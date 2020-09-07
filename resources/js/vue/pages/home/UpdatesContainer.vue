<template>
    <section class="updates container">
      <div class="feed">
        <h3 class="feed__title heading-third">Latest updates</h3>

            <swiper
                ref="swiper"
                :options="swiperOptions"
                :style="{
                    'overflow': 'visible',
                    'width': '100%',
                    'background-color': 'none'}">

                    <swiper-slide
                        v-for="card in updates"
                        :key="card.id">
                       
                       <card 
                        square-form
                        margined
                        :style="{
                            'width': '400px'}"/>
                    </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script>

import { Swiper as SwiperClass, Pagination, Autoplay } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import Card from '@components/cards/Card';
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


            ],
            
            swiperOptions: {
                slidesPerView: 'auto',


            }
        }
    },  

    beforeMount() {

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