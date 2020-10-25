<template>
  <section class="about-me container">

    <div class="about-me__person">
      <div class="abot-me__photo">
        <h3 class="about-me__name heading-third">Irina Ivanova</h3>
      </div>
    </div>

    <div class="about-me__paragraph">
      <h2 class="about-me__title heading-first">About me</h2>
      <p class="about-me__text text-first">
        {{ description }}
      </p>
    </div>

<!--     <div 
      class="about-me__merit"
      v-for="({descrition, title}, index) in achivments"
      :key="index">

      <div class="about-me__merit-picture about-me__picture--first">
        <h4 class="about-me__merit-title heading-fourth">{{ title }}</h4>
      </div>
      <p class="about-me__merit-text text-second">{{ descrition }}</p>
    </div> -->

    <div class="about-me__merit">
      <div class="about-me__merit-picture about-me__picture--first">
        <h4 class="about-me__merit-title heading-fourth">Nulla porttitor</h4>
      </div>
      <p class="about-me__merit-text text-second">
        Elit eget gravida cum sociis natoque penatibus. Lobortis mattis
        aliquam faucibus purus in massa tempor nec.
        Rhoncus est pellentesque elit ullam.
      </p>
    </div>

    <div class="about-me__merit">
      <div class="about-me__merit-picture about-me__picture--first">
        <h4 class="about-me__merit-title heading-fourth">Nulla porttitor</h4>
      </div>
      <p class="about-me__merit-text text-second">
        Elit eget gravida cum sociis natoque penatibus. Lobortis mattis
        aliquam faucibus purus in massa tempor nec.
        Rhoncus est pellentesque elit ullam.
      </p>
    </div>

    <div class="about-me__merit">
      <div class="about-me__merit-picture about-me__picture--first">
        <h4 class="about-me__merit-title heading-fourth">Nulla porttitor</h4>
      </div>
      <p class="about-me__merit-text text-second">
        Elit eget gravida cum sociis natoque penatibus. Lobortis mattis
        aliquam faucibus purus in massa tempor nec.
        Rhoncus est pellentesque elit ullam.
      </p>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      image: '',

      description: 'My name is Mary Cousins, lorem ipsum dolor sit amet, consectetur adipiscing'
                 + 'elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at'
                 + 'Morbi tristique senectus et netus et malesuada fames ac turpis. Etiam sit amet nisl purus in mollis nunc sed.',
    
      achivments: [
        {
          title: 'Nulla porttitor',
          description: 'Elit eget gravida cum sociis natoque penatibus. Lobortis mattis'
                     + 'aliquam faucibus purus in massa tempor nec.'
                     + 'Rhoncus est pellentesque elit ullam.'
        },
        {
          title: 'Nulla porttitor',
          description: 'Elit eget gravida cum sociis natoque penatibus. Lobortis mattis'
                     + 'aliquam faucibus purus in massa tempor nec.'
                     + 'Rhoncus est pellentesque elit ullam.'
        },
        {
          title: 'Nulla porttitor',
          description: 'Elit eget gravida cum sociis natoque penatibus. Lobortis mattis'
                     + 'aliquam faucibus purus in massa tempor nec.'
                     + 'Rhoncus est pellentesque elit ullam.'
        }
      ],
    }
  }
}
</script>