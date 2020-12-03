import { throttle } from 'throttle-debounce';

class Resolution {
	
	__type = null;

	__listeners = [];

	__mobileBoundary = 770;

	__tabletBoundary = 1200;	

	constructor() {
		const DELAY = 200;
		let throttled = throttle(DELAY, this.check.bind(this));
		
		window.addEventListener('resize', throttled);

		this.check();
	}

	check() {

		if (window.innerWidth <= this.__mobileBoundary) {
			if (this.__type !== 'mobile') {
				this.__type = 'mobile';
				this.onChange();
			}

			return
		}
		
		if (window.innerWidth <= this.__tabletBoundary) {
			if (this.__type !== 'tablet') {
				this.__type = 'tablet';
				this.onChange();
			}

			return;
		}

		if (window.innerWidth > this.__tabletBoundary) {
			if (this.__type !== 'desktop') {
				this.__type = 'desktop';
				this.onChange();
			}
			
			return;
		}
	}

	onChange() {
		let desktop = this.isDesktop();		
		let mobile = this.isMobile();		
		let tablet = this.isTablet();


		for (let callback of this.__listeners)
			callback(mobile, tablet, desktop);
	}

	bind(callback) {
		this.listen(callback)

		callback(this.isMobile(),
						this.isTablet(),
						this.isDesktop());
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
		return  this.__type === 'mobile';
	}

	isTablet() {
		return  this.__type === 'tablet';
	}

	isDesktop() {
		return  this.__type === 'desktop';
	}
}

window.Resolution = new Resolution;

export default window.Resolution;