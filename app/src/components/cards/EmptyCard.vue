<template>
	<div class="card empty-card">
		<div class="card__image">
			<div class="card__header">
				<button	class="card__favorite-button">
				  <span class="card__favorite-icon material-icons-round">favorite</span>
				</button>
				<div class="card__views">
					<span class="card__views-icon material-icons-round">visibility</span>
					<span class="card__views-count"></span>
				</div>
			</div>
			<div class="card__title"></div>
		</div>
		<div class="card__text">
			<p class="text-third"></p>
		</div>
		<div class="card__footer">
				<div class="card__tags">
					<div class="card__tag-secondary card__tag tag tag--circle"></div>
          <div class="card__tag-secondary card__tag tag tag--circle"></div>
					<button class="card__tag-main tag tag--main">
						<span class="tag__name" for="cb2"></span>
					</button>
				</div>
				<time class="card__date"></time>
		</div>
	</div>
</template>

<script>
export default {

}
</script>