import Resolution from '@services/Resolution'

const HandleDynamicSlides = {
  data() {
    return {
      swiperOptions: {
        spaceBetween: 30
      },
      
      resolution: null,
      
      mobileSlides: 1,
      tabletSlides: 2,
      desktopSlides: 4,
    }
  },

  beforeMount() {
    Resolution.bind(this.updateSwiper);
  },

  methods: {
    updateSwiper(mobile, tablet, desktop) {
			if (mobile) {
        this.swiperOptions.slidesPerView = this.mobileSlides;
				this.resolution = 'mobile';
				return;
			}

			if (tablet) {
        this.swiperOptions.slidesPerView = this.tabletSlides;
				this.resolution = 'tablet';
				return;
			}

			if (desktop) {
        this.swiperOptions.slidesPerView = this.desktopSlides;
				this.resolution = 'desktop';
				return;
			}
		},
  }
}

export default HandleDynamicSlides;