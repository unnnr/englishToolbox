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
					v-for="update in updates"
					:key="update.id">
					
					<card 
						:description="update.description"
						:created-at="update.createdAt"
						:title="update.title"
						:img="update.thumbnail"
						:views="update.views"
						:favorite="update.favorite"

						:main-tag="update.mainTag"
						:tags="update.tags"
						
						@favorite-toggle="toggleFavorite(update)"
						@select="goTo(update)"/>


					
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
import HandleRequests from '@mixins/HandleRequests'

// components
import EmptyCard from '@components/cards/EmptyCard'
import Card from '@components/cards/Card';

SwiperClass.use([Pagination, Autoplay])
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)


export default {
	components: {
		SwiperSlide,
		Swiper,
		EmptyCard, 
		Card
	},

	mixins: [ 
		HandleDynamicSlides,
		HandleRequests,
	],

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
		disabled() {
			return this.updates.length  === 0;
		},

		loadingCards() {
			return this.disabled ? 4 : 0;
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

		findFavorite(update) {
			for (let favorite of this.favorites)  {
				if (favorite.postType === update.postType
					&& update.postId === favorite.post.id)
					return favorite;
			}

			return null;
		},

		async makeFavorite(update) {
			let type = PostLinks.getPath(update.postType);
			let data = new FormData();
			data.append('postId', update.postId);
				
			let favorite = 
				await Favorites.create(type, data);

			this.favorites.push(favorite);
			this.$set(update, 'favorite', true);
		},

		async unfavorite(update) {
			let favorite = this.findFavorite(update);
			if (!!!favorite)
				return;

			await Favorites.delete(favorite.id);

			let index = this.favorites.indexOf(favorite)
			this.favorites.splice(index, 1);
			this.$set(update, 'favorite', false);
		},

		async toggleFavorite(update) {
			if (!!!this.favorites)
				return;

			if (update.favorite)
				this.send(() => 
					this.unfavorite(update))
			else
				this.send(() => 
					this.makeFavorite(update))
		},

		async loadFavorites() {
			let favorites = await Favorites.all();
			for (let update of this.updates) {
				for (let favorite of favorites) {
					if (favorite.postType !== update.postType 
						|| favorite.post.id !== update.postId )
					continue;

					this.$set(update, 'favorite', true);
					break
				}
			}

			this.favorites = favorites;
		},

		async load() {
			this.updates = await Updates.all();

			if (!!!await Auth.check())
				return;

			this.loadFavorites();
		},
	}
}
</script>

<style lang="sass">

.updates .card 
  animation: card-fade-in .5s ease-in

@keyframes card-fade-in
  from
    opacity: 0
  to 
    opacity: 1

</style>