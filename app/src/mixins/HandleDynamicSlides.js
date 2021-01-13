import Resolution from '@services/Resolution'

const HandleDynamicSlides = {
  data() {
    return {
      swiperOptions: {},
      
      resolution: {
        type: null,

        slides: {
          mobile: 1,
          smalTablet: 2,
          tablet: 3,
          desktop: 4
        },

        space: {
          mobile: 10,
          smalTablet: 10,
          tablet: 15,
          desktop: 15
        }
      },
    }
  },

  beforeMount() {
    Resolution.bind(this.updateSwiper);
  },

  methods: {
    updateSwiper(type) {
      this.resolution.type = type;

      this.swiperOptions.slidesPerView = 
        this.resolution.slides[type];

      this.swiperOptions.spaceBetween = 
        this.resolution.space[type];
		},
  }
}

export default HandleDynamicSlides;