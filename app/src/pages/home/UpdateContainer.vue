<template>
	<section class="updates container">
		<div class="feed">
			<div class="feed__header">
				<h3 class="feed__title heading-third">Latest updates</h3>
				<div class="swiper-pagination" slot="pagination"></div>
			</div>

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
						:main-tag="{label: 'video', color: '#b9cfe3'}"
						:tags="card.tags"
						square-form
						margined/>
				</swiper-slide>

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
	components: {
		SwiperSlide,
		Swiper,
		Card
	},

	data: function() {
		return {
			updates: [
				{id: 1, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/sddefault.jpg', tags: [{label: 'some', color: 'pink'}, {label: 'some', color: 'lightgreen'}]},
				{id: 2, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/7NOSDKb0HlU/sddefault.jpg', tags: [{label: 'some', color: 'cadetblue'}, {label: 'some', color: 'aliceblue'}]},
				{id: 3, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/bQzIQa5YKvw/sddefault.jpg', tags: [{label: 'some', color: 'pink'}, {label: 'some', color: 'antiquewhite'}]},
				{id: 4, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/5yx6BWlEVcY/sddefault.jpg', },
				{id: 5, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/7NOSDKb0HlU/sddefault.jpg', tags: [{label: 'some', color: 'pink'}, {label: 'some', color: 'lightgreen'}]},
				{id: 6, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/IcUy2wur1kU/sddefault.jpg', tags: [{label: 'some', color: 'azure'}, {label: 'some', color: 'lightgreen'}]},
				{id: 7, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/sddefault.jpg' },
				{id: 8, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/7NOSDKb0HlU/sddefault.jpg', tags: [{label: 'some', color: 'cornflowerblue'}, {label: 'some', color: 'lightgreen'}]},
				{id: 9, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/bQzIQa5YKvw/sddefault.jpg', tags: [{label: 'some', color: 'darksalmon'}, {label: 'some', color: 'cornsilk'}]},
				{id: 10, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/5yx6BWlEVcY/sddefault.jpg', tags: [{label: 'some', color: 'gainsboro'}, {label: 'some', color: 'coral'}]},
				{id: 11, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/7NOSDKb0HlU/sddefault.jpg', tags: [{label: 'some', color: 'pink'}, {label: 'some', color: 'cadetblue'}]},
				{id: 12, title: 'Lorem impusm', thumbnail: 'https://i.ytimg.com/vi/IcUy2wur1kU/sddefault.jpg' },
			],
				
			swiperOptions: {
				slidesPerView: '4',

				/* pagination: {
						el: '.swiper-pagination',
						dynamicBullets: true
				} */
			}
		}
	},  

	beforeMount() {
		Updates.onload(() => {
			//this.updates = Updates.all();  
		}); 

		console.log('mouted');
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