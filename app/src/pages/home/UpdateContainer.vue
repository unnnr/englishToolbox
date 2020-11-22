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
					v-for="index in loadingCards"
					:key="index">

					<empty-card 
						square-form
						margined/>

				</swiper-slide>

				<swiper-slide
					v-for="post in updates"
					:key="post.id">
					
					<card 
						:description="post.description"
						:created-at="post.createdAt"
						:title="post.title"
						:img="post.thumbnail"

						:main-tag="post.mainTag"
						:tags="post.tags"/>
					
				</swiper-slide>
			</swiper>
		</div>
	</section>
</template>

<script>
import 'swiper/swiper-bundle.css'
import { Swiper as SwiperClass, Pagination, Autoplay } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import EmptyCard from '@components/cards_new/EmptyCard'
import Updates from '@models/Updates';
import Card from '@components/cards_new/Card';

SwiperClass.use([Pagination, Autoplay])
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
	components: {
		SwiperSlide,
		Swiper,
		EmptyCard, 
		Card
	},

	data() {
		return {
			updates: [],
				
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
			return this.updates.length  === 0;
		},

		loadingCards() {
			return this.loading ? 4 : 0;
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