<template>
    <section class="banner container">
      <div ></div>
        <swiper
            ref="swiper"
            class="banner__carousel"
            :options="swiperOptions"
            @transition-end="paint">

                <swiper-slide>
                    <div 
                        class="item"
                        ref="firstSlide"
                        :style="{'backgroundColor': fistColor}">
                    </div>   
                </swiper-slide>
                
               <swiper-slide>
                    <div 
                        class="item"
                        ref="secondSlide"
                        :style="{'backgroundColor': secondColor}">
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
                    delay: 5000,
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