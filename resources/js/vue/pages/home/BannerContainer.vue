<template>
    <section class="banner container">
      <div ></div>
        <swiper
            ref="swiper"
            class="banner__carousel"
            :options="swiperOptions">

                <swiper-slide>
                    <div class="banner__slide banner__slide--right">
                        <object data="img/svg/videos-banner.svg" type="image/svg+xml"></object>
                        <h1 class="banner__text heading-first">Study with <br> our videos</h1>
                        <button class="banner__button heading-fourth">go on page</button>
                    </div>   
                </swiper-slide>

                <swiper-slide>
                    <div class="banner__slide banner__slide--left">
                        <object data="img/svg/audios-banner.svg" type="image/svg+xml"></object>
                        <h1 class="banner__text heading-first">Study with <br> our audios</h1>
                        <button class="banner__button heading-fourth">go on page</button>
                    </div>   
                </swiper-slide>

                <swiper-slide>
                    <div class="banner__slide banner__slide--right">
                        <object data="img/svg/schemas-banner.svg" type="image/svg+xml"></object>
                        <h1 class="banner__text heading-first">Study with <br> our schemas</h1>
                        <button class="banner__button heading-fourth">go on page</button>
                    </div>   
                </swiper-slide>

                <swiper-slide>
                    <div class="banner__slide banner__slide--left">
                        <object data="img/svg/games-banner.svg" type="image/svg+xml"></object>
                        <h1 class="banner__text heading-first">Study with <br> our games</h1>
                        <button class="banner__button heading-fourth">go on page</button>
                    </div>   
                </swiper-slide>
                
        </swiper>
    </section>
    
</template>

<script>
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import { Swiper as SwiperClass, Pagination, Autoplay } from 'swiper/core'
import 'swiper/swiper-bundle.css'

SwiperClass.use([Pagination, Autoplay])
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
    name: 'banner-container',

    components: {
        Swiper,
        SwiperSlide
    },
    
    data: function() {
        return {

            fistColor: null,
            secondColor: null,

            swiperOptions:{
                slidesPerView: 1,
             
                speed: 900,
                autoplay: { 
                    delay: 5000000,
                    disableOnInteraction: false
                },
            
                loop: true,
            }
        }
    },  

    beforeMount() {
        this.fistColor = this.randomColor();
        this.secondColor = this.randomColor();
    },

    methods: {
        randomColor() {
            return  '#' + Math.floor(Math.random()  * Math.pow(16, 6)).toString(16).padStart(6, '0');
        },

        paint(event) {
            let currentIndex = event.activeIndex % 2;

            if (currentIndex == 0)
                this.fistColor = this.randomColor();
            else 
                this.secondColor = this.randomColor();
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

<style>
.swiper-wrapper {
  transition-timing-function: ease !important;
}

</style>