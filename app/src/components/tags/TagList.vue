<template>
	<div class="card__tags">
		<div class="card__tag tag tag--circle"></div>
		<div class="card__tag tag tag--circle"></div>
		<div class="card__tag tag tag--circle"></div>
		<div class="card__tag tag tag--circle"></div>
		<button class="card__tag-main tag tag--main">mainTag</button>
	</div>
</template>

<script>
export default {
	props: {
		tags: { type: Array, default: () => [] },

		mainTag: { type: Object, default: null }
	}
}
</script>