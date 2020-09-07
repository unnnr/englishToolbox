<template>
    <section class="banner container">
      <div ></div>
        <swiper
            ref="mySwiper"
            class="banner__carousel"
            :options="swiperOptions">

                <swiper-slide>
                    <div 
                        class="item"
                        :style="{'backgroundColor': randomColor()}">
                    </div>   
                </swiper-slide>
                
                <swiper-slide>
                    <div 
                        class="item"
                        :style="{'backgroundColor': randomColor()}">
                    </div>   
                </swiper-slide>

                <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </section>
    
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'


export default {
    name: 'banner-container',

    data: function() {
        return {
            items: [

            ],
            swiperOptions:{}
        }
    },  

    components: {
        Swiper,
        SwiperSlide
    },
    
    directives: {
        swiper: directive
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