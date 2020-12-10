<template>
	<section class="updates container">
		<div class="feed">
			<div class="feed__header">
				<h3 class="feed__title heading-third">Latest updates</h3>
				<div class="swiper-pagination" slot="pagination"></div>
			</div>

			<swiper
				ref="swiper"
				:key="resolution.type"
				:cleanup-styles-on-destroy="false"
				:options="swiperOptions">

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
						:views="post.views"
						:favorite="post.favorite"

						:main-tag="post.mainTag"
						:tags="post.tags"
						
						@select="goTo(post)"/>
					
				</swiper-slide>
			</swiper>
		</div>
	</section>
</template>

<script>
// services
import 'swiper/swiper-bundle.css'
import { Swiper as SwiperClass, Pagination, Autoplay } from 'swiper/core'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import PostLinks from '@services/PostLinks'
import Favorites from '@models/Favorites'
import Updates from '@models/Updates'
import Auth from '@services/Auth'

// mixins
import HandleDynamicSlides from '@mixins/HandleDynamicSlides'

// components
import EmptyCard from '@components/cards_new/EmptyCard'
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

	mixins: [ HandleDynamicSlides ],

	data() {
		return {
			updates: [],

			swiperOptions: {

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
		goTo(update) {
			let path = 
				PostLinks.generate(update.postType, update.postId)

			this.$router.push({ path });
		},

		async load() {
			this.updates = await Updates.all();

			if (!!!await Auth.check())
				return;

			let favorites = await Favorites.all();
			for (let update of this.updates) {
				for (let index in favorites) {
					let favorite = favorites[index];

					if (favorite.postType !== update.postType 
						|| favorite.post.id !== update.postId )
					continue;


					favorites.splice(index, 1)
					this.$set(update, 'favorite', true);
					break
				}
			}

			this.favoritesLoaded = true;
		},

		async loadFavorites() {

		},

		parseFavorites(favorites) {

		}
	}
}
</script>