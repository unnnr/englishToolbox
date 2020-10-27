<template>
  <div class="pool container pe"> 
    <card 
      v-for="index in 10"
      :key="index"
      :img="generateImage()"
      :title="generateTitle()"
      :description="generateDescription()"
      :views="generateViews()"
      :createdAt="generateData()"/>
  </div>
</template>

<script>
import Faker from 'faker/locale/ja'
import FormatedDate from '@services/FormatedDate'
import Card from '@components/cards_new/Card'


export default {
  components: {
    Card
  },

  methods: {
    generateImage() {
    return Faker.image.image();
    },

    generateTitle() {
      return Faker.lorem.sentence();
    },

    generateDescription() {
      return Faker.lorem.paragraph();
    },

    generateViews() {
      return Faker.random.number(10);
    },

    generateData() {
      return FormatedDate.parse(Faker.date.past());
    }
  }
}
</script>