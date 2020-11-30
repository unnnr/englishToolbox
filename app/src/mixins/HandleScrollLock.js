const HandleScrollLock = {
  data() {
    return {
      lockClass: 'scroll-lock'
    }
  },
  
  methods: {
		lockScroll() {
			document.body.classList.add(this.lockClass);
		},

		unlockScroll() {
			document.body.classList.remove(this.lockClass);
		},
  }
}

export default HandleScrollLock;