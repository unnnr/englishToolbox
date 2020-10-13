<template>
	<section class="banner container">
		<div ></div>
			<swiper
				ref="swiper"
				class="banner__carousel"
				:options="swiperOptions">

				<swiper-slide 
					v-for="({image, action, label}, index) of banners"
					:key="index">

					<div 
						class="banner__slide"
						:class="getAddClass(index)">
						
						<img :src="image">
						
						<h1 class="banner__text heading-first">{{ label }}</h1>
						
						<button 
							class="banner__button heading-fourth"
							@click="action">
							
							go on page
						</button>
					</div>   
				</swiper-slide>

			<div class="swiper-scrollbar" slot="scrollbar"></div>
		</swiper>
	</section>
</template>

<script>

import 'swiper/swiper-bundle.css'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import { Swiper as SwiperClass, Pagination, Autoplay, Scrollbar } from 'swiper/core'

SwiperClass.use([Pagination, Autoplay, Scrollbar]);

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  components: {
		Swiper,
		SwiperSlide
  },
    
	data: function() {
		return {
			swiperOptions:{
				slidesPerView: 1,

				grabCursor: true,
			
				speed: 900,
				autoplay: { 
					delay: 5000000,
					disableOnInteraction: false
				},

				scrollbar: {
					el: '.swiper-scrollbar',
					hide: true
				},

				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
		
				loop: true,
			},

			banners: [
				{ 
					image: 'img/svg/videos-banner.svg',
					label: 'Study with \n our videos',
					action: this.createRedirect('videos'),
				},
				{ 
					image: 'img/svg/audios-banner.svg',
					label: 'Study with \n our videos',
					action: this.createRedirect('audio'),
				},
				{ 
					image: 'img/svg/schemas-banner.svg',
					label: 'Study with \n our videos',
					action: this.createRedirect('schemas'),
				},
				{ 
					image: 'img/svg/games-banner.svg',
					label: 'Study with \n our videos',
					action: this.createRedirect('games'),
				},
			]
		}
	},  

	beforeMount() {
		this.fistColor = this.randomColor();
		this.secondColor = this.randomColor();
	},

	methods: {
		createRedirect(path) {
			return function () {
				window.location = window.origin + '/' + path;
			};
		},

		randomColor() {
			return  '#' + Math.floor(Math.random()  * Math.pow(16, 6)).toString(16).padStart(6, '0');
		},

		getAddClass(index) {
			if (index % 2 === 0)
				return 'banner__slide--right';

			return 'banner__slide--left';
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