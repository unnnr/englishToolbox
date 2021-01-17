<template>
	<section class="banner container">
		<swiper
			class="banner__swiper"
			ref="swiper"
			:cleanup-styles-on-destroy="false"
			:options="swiperOptions">

			<swiper-slide 
				ref="swiper"
				v-for="({name, action, additionalClass}, index) of banners"
				:key="index">

				<div 
					class="banner__slide"
					:class="additionalClass">
					
					<picture>
						<source 
							media="(max-width: 576px)"
							:srcset="mobileUrl(name)">

						<source
							media="(max-width: 1000px)"
							:srcset="tabletUrl(name)">

						<img 
							alt="#"
							:src="desktopUrl(name)">
					</picture>

					
					<button 
						class="banner__button"
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
import { Swiper as SwiperClass, Pagination, Autoplay, Scrollbar } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import 'swiper/swiper-bundle.css'

SwiperClass.use([Pagination, Autoplay, Scrollbar]);
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)


export default {
	components: {
		Swiper,
		SwiperSlide
	},
    
	data() {
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

			freezed: true,

			banners: [
				{ 
					name: 'banner-videos',
					action: this.createRedirect('videos'),
				},
				{ 
					name: 'banner-audios',
					action: this.createRedirect('videos'),
				},
				{ 
					name: 'banner-charts',
					action: this.createRedirect('videos'),
				},
				{ 
					name: 'banner-games',
					action: this.createRedirect('videos'),
				},
			]
		}
	},  

	beforeDestroy() {
		let swiper = this.$refs.swiper;
	},

	computed: {
		path() {
			return 'img/svg/';
		}
	},

	methods: {
		freezeWidth() {
			this.freezed = true;

		},

		desktopUrl(fileName) {
			return this.path + fileName + '-desktop.svg';
		},

		tabletUrl(fileName) {
			return this.path + fileName + '-tablet.svg';
		},

		mobileUrl(fileName) {
			return this.path + fileName + '-mobile.svg';
		},

		createRedirect(to) {
			return () => 
				this.$router.push({name: to}) 
		},
	}
}
</script>
