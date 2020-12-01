<template>
	 <main class="i-recommend container">
      <h3 class="i-recommend__title heading-third">I recommend</h3>
			
			<recommendation
				v-for="recommendation of recommendations"
				:key="recommendation.id"

				:description="recommendation.description"
				:image="recommendation.image"
				:title="recommendation.title"
				:link="recommendation.link"/>

      <div class="i-recommend__card i-recommend__card--editor">
        
        <div class="i-recommend__card-image i-recommend__card-image i-recommend__card-image--loaded">
          <input type="file">
        </div>

        <div class="input-group-secondary i-recommend__card-title-input">
          <div class="input-group__inner">
            <span class="input-group__title">Your title</span>
            <input placeholder="title" class="input-group__input">
          </div>
        </div>

        <div class="textarea-group-secondary i-recommend__card-textarea">
          <span class="textarea-group__title">
            Text
            <small class="textarea-group__counter">0/180</small>
          </span>
          <textarea maxlength="180" class="textarea-group__textarea"></textarea>
        </div>
        
        <div class="input-group-secondary i-recommend__card-link-input">
          <div class="input-group__inner">
            <span class="input-group__title">Your link</span>
            <input placeholder="link" class="input-group__input">
          </div>
        </div>

      </div>

  </main>
</template>

<script>
import Recommendation from '@components/recommendations/Recommendation'

export default {
	components: {
		Recommendation
	},

	data() {
		return {
			recommendations: [{id: 12, title: '', description: '', link: '	'}]
		}
	}
}
</script>