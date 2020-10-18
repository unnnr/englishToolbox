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
					v-for="card in slides"
					:key="card.id">
					
					<empty-card 
						v-if="loading"
						square-form
						margined/>
					
					<card 
						v-else
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

import 'swiper/swiper-bundle.css'
import { Swiper as SwiperClass, Pagination, Autoplay } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import EmptyCard from '@components/cards/EmptyCard'
import Card from '@components/cards/Card';
import Updates from '@models/Updates';

SwiperClass.use([Pagination, Autoplay])
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
	components: {
		SwiperSlide,
		Swiper,
		EmptyCard, 
		Card
	},

	data: function() {
		return {
			updates: null,
				
			swiperOptions: {
				slidesPerView: '4',

				/* pagination: {
						el: '.swiper-pagination',
						dynamicBullets: true
				} */
			}
		}
	},  

	computed: {
		loading() {
			return this.updates === null;
		},

		defaultUpdates() {
			return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 } ]
		},

		slides() {
			return this.loading ? this.defaultUpdates : this.updates;
		}
	},

	beforeMount() {
		this.load();
	},

	methods: {
		async load() {
			this.updates = await Updates.all();
		}
	}
}
</script>

<style>

.swiper-slide {
	width: auto;
}
 
</style>