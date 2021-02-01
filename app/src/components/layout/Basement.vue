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
          :class="contact.class"
          
          target="_blank"
          :href="contact.link">

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
        © Copyright {{ year }} englishnerd − All Rights Reserved
      </p>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear();
    }
  },

  data() {
    return {
      contacts: [
        { name: '@lerankara',         class: 'footer__contact--twetter',  link:'https://twitter.com/Lerankara' },
        { name: 'Tash',               class: 'footer__contact--youtube',  link:'https://www.youtube.com/channel/UCBAxIivBEnERXPbvMd8gP8Q' },
        { name: '@lera.novaya',       class: 'footer__contact--facebook', link:'https://www.facebook.com/lera.novaya' },
        { name: 'Leranka#3767',       class: 'footer__contact--discord',  link:'https://discord.com' },
        { name: '@EnglishNerd',       class: 'footer__contact--skype',    link:'skype:EnglishNerd?chat' },
        { name: 'tash7272@gmail.com', class: 'footer__contact--mail',     link:'mailto:tash7272@gmail.com' },
      ],

      links: [
				{ name: '/home#about',      label: 'about me'},
				{ name: '/videos',          label: 'videos'},
				{ name: '/audio',           label: 'audio'},
				{ name: '/charts',          label: 'charts'},
				{ name: '/games',           label: 'games'},
				{ name: '/recommendations', label: 'I recommend'},
			]
    }
  },
}
</script>