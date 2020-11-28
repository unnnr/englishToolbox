import { throttle } from 'throttle-debounce';

class Resolution {
	
	__mobile = null;

	__listeners = [];

	__boundary = 1200;

	constructor() {
		const DELAY = 200;
		let throttled = throttle(DELAY, this.check.bind(this));
		
		window.addEventListener('resize', throttled);

		this.__mobile = 
			window.innerWidth <= this.__boundary;
	}

	check() {
		if (this.__mobile && window.innerWidth > this.__boundary)
			this.onChange(false)

		else if (!!!this.__mobile && window.innerWidth <= this.__boundary)
			this.onChange(true)
	}

	onChange(isMobile) {
		this.__mobile = isMobile;
		
		for (let callback of this.__listeners)
			callback(isMobile);
	}

	listen(callback) {
		if (typeof callback !== 'function')
			throw 'Incorrect callback type';

		this.__listeners.push(callback);
	}

	detach(callback) {
		let index = this.__listeners.indexOf(callback);

		if (index === -1)
			return false;

		this.__listeners.splice(index, 1);
		return true;
	}

	isMobile() {
		return  this.__mobile;
	}

	isDesktop() {
		return  !!!this.__mobile;
	}
}

window.Resolution = new Resolution;

export default window.Resolution;