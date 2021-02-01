<template>
  <section class="about-me container">

    <div class="about-me__person">
      <div 
        class="abot-me__photo"
        :style="{'background-image': getUrl(photo)}">
        
        <h4 class="about-me__name heading-fourth">Natalya Novoseltseva</h4>
      </div>
    </div>

    <div class="about-me__paragraph">
      <h2 class="about-me__title heading-first">About me</h2>
      <p class="about-me__text text-second">
        {{ description }}
      </p>
    </div>

    <div 
      class="about-me__merit"
      v-for="(merit, index) in achivments"
      :key="index">

      <div 
        class="about-me__merit-picture about-me__picture--first"
        :style="{'background-image': getUrl(merit.image)}">

        <h5 class="about-me__merit-title heading-fifth">
          {{ merit.title }}
        </h5>
      </div>
      
      <p class="about-me__merit-text text-second">
        {{ merit.description }}
      </p>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      photo: 'img/about_me_photo.png',
      description: 'The art of learning any foreign language has its tiny secrets and cute gimmicks that can be turned into powerful tools in the hands of dedicated. An experienced educator and a communication skills specialist joined their efforts and knowledge and created this website to help students and teachers reach their goals. If you are an English learner, you will be able to reinforce your knowledge here. If you teach English, we invite you to use our materials to save your time and energy. Everybody is welcomed here, everyone is appreciated',
    
      achivments: [
        {
          image: 'img/about_me_merit_1.png',
          title: 'Exam preparation',
          description: `"Their" or 'there"? "What's up?" or "WhatsApp"? "Lie" or "lay"? All those tiny but critical nuances can be sometimes annoying. Learn the difference and practise using them with confidence.`
        },
        {
          image: 'img/about_me_merit_2.png',
          title: 'Real Life English',
          description: 'All the exercises on our website are based on American, Canadian, Australian, and British TV shows, movies, series, ans real-life situations.'
        },
         {
          image: 'img/about_me_merit_3.png',
          title: 'Grammar practice',
          description: 'Master all four essential skills (listening, speaking, writing, reading) with us to boost your exam scores.'
        },
      ],
    }
  },

  methods: {
    getUrl(link) {
      return 'url(' + link + ')';
    }
  }
}
</script>