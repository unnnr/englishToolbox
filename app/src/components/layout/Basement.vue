<template>
  <section class="basement">
    <footer class="footer container">
      <h5 class="footer__title heading-fifth">Contacts</h5>
      <h5 class="footer__title heading-fifth">links</h5>
      <div class="footer__contacts">
        <a  
          v-for="(contact, index) of contacts" 
          :key="index"     

          class="footer__contact text-fourth"
          :class="contact.class">

          {{ contact.name }}
        </a>

      </div>
      
      <div class="footer__links">
        <router-link 
          class="footer__link text-fourth"
          
          v-for="(link, index) in links" 
          :key="index"

          :to="link.name">

          {{ link.label }}
        </router-link>
      </div>
    </footer>

    <div class="copyright container">
      <p class="copyright__text">
        © Copyright 2021 englishnerd − All Rights Reserved
      </p>
      <button class="copyright__development">
        <p class="copyright__development-text">website by <span>olverica</span></p>
        <img class="copyright__development-logo" src="img/svg/olverica.svg" alt="">
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        { name: 'youtube',             class: 'footer__contact--youtube' },
        { name: '@twetter',            class: 'footer__contact--twetter' },
        { name: '@facebook',           class: 'footer__contact--facebook' },
        { name: 'mailadress@mail.com', class: 'footer__contact--mail' },
        { name: 'discord#3221',        class: 'footer__contact--discord'},
        { name: '@skype',              class: 'footer__contact--skype'},
      ],

      links: [
				{ name: '/home#about', label: 'about me'},
				{ name: '/videos', label: 'videos'},
				{ name: '/audio', label: 'audio'},
				{ name: '/charts', label: 'charts'},
				{ name: '/games', label: 'games'},
				{ name: '/recommendations', label: 'I recommend'},
			]
    }
  },
}
</script>