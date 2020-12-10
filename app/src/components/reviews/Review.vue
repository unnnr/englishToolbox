<template>
  <div class="reviews__card">
    <div class="reviews__card-person">
      <div 
        class="reviews__card-photo"
        :style="{'background-image': url}">
      </div>

      <h5 class="reviews__card-name heading-fifth">
        {{ authorName }}
      </h5>
    </div>

    <h5 class="reviews__card-title heading-fifth">
      {{ title }}
    </h5>

    <p class="reviews__card-text text-third"> 
      {{ text }}
    </p>
    
    <div class="review__grade">
      <div class="review__stars">
        <div 
          v-for="index in maxGrade"
          :key="index"

          class="review__star"
          :class="{'review__star--selected': index <= grade}">
        </div>
      </div>
      <span class="review__rating">
        {{ grade }}
      </span>
    </div>
  </div>
</template>

<script>
import FakeData from '@services/FakeData'

export default {
  props: {
    text: { type: String, default: '奴ら はちまき 奉仕 備える ひきざん あう じぶん ぼうず むぜい しょうゆ 戦没 体重 特殊 おかね しゃくや' },
    
    title: { type: String, default: '右翼 備える うえる 品詞' },
    
    grade: { type: Number, default: 5 },

    user: { type: Object, default: null },
  },

  computed: {
    authorName() {
      return this.user ? this.user.name : '陸斗';
    },

    avatar() {
      return this.user ? this.user.avatar : '#';
    },
    
    url() {
      return 'url(' + this.avatar + ')';
    },

    maxGrade() {
      return 5;
    }
  }
}
</script>