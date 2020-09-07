<template>
    <section class="banner container">
      <div ></div>
        <swiper
            ref="swiper"
            class="banner__carousel"
            :options="swiperOptions"
            >

                <swiper-slide>
                    <div 
                        class="item"
                        :style="{'backgroundColor': randomColor(), 'width':1000+'px'}">
                    </div>   
                </swiper-slide>
                
               <swiper-slide>
                    <div 
                        class="item"
                        :style="{'backgroundColor': randomColor(), 'width':1000+'px'}">
                    </div>   
                </swiper-slide>

                <swiper-slide>
                    <div 
                        class="item"
                        :style="{'backgroundColor': randomColor(), 'width':1000+'px'}">
                    </div>   
                </swiper-slide>

                <swiper-slide>
                    <div 
                        class="item"
                        :style="{'backgroundColor': randomColor(), 'width':1000+'px'}">
                    </div>   
                </swiper-slide>

        </swiper>
    </section>
    
</template>

<script>
import 'swiper/swiper-bundle.css'


import { Swiper as SwiperClass, Pagination, Autoplay } from 'swiper/core'


SwiperClass.use([Pagination, Mousewheel, Autoplay])

import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'


const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)


export default {
    name: 'banner-container',

    components: {
        Swiper,
        SwiperSlide
    },
    
    data: function() {
        return {

            swiperOptions:{
          slidesPerView: 1,
	autoplay: { delay: 2000 },
         spaceBetween: 30,
        loop: true,
          loop: true,
            }
        }
    },  

    mounted() {
        console.log(this.$refs.swiper);
    },

    methods: {
        randomColor() {
            return  '#' + Math.floor(Math.random()  * Math.pow(16, 6)).toString(16).padStart(6, '0');
        }
    }
}
</script>

<style scoped>

.item {
    width: 100%;
    height: 100%;
}

</style>