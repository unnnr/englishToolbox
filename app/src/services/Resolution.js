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


	}

	check() {
		if (this.__type !== 'mobile' && window.innerWidth <= this.__mobileBoundary) {
			this.__type = 'mobile';
			this.onChange();
			return;
		}

		if (this.__type !== 'tablet' && window.innerWidth <= this.__tabletBoundary) {
			this.__type = 'tablet';
			this.onChange();
			return;
		}

		if (this.__type !== 'desktop' && window.innerWidth > this.__tabletBoundary) {
			this.__type = 'desktop';
			this.onChange();
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
		
		let desktop = this.isDesktop();		
		let mobile = this.isMobile();		
		let tablet = this.isTablet();

		callback(mobile, tablet, desktop);
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