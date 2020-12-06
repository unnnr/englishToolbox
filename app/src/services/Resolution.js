import { throttle } from 'throttle-debounce';

class Resolution {
	
	__type = null;

	__listeners = [];

	__rawListeners = [];

	boundaries = [
		{ name: 'mobile', 		px: 576 },
		{ name: 'smalTablet', px: 1000 },
		{ name: 'tablet', 		px: 1200 },
		{ name: 'desktop', 		px: Infinity },
	];

	MOBILE = 'mobile';

	SMAL_TABLET = 'smalTablet';

	TABLET = 'tablet';

	DESKTOP = 'desktop';

	constructor() {
		const DELAY = 200;
		let throttled = throttle(DELAY, this.check.bind(this));
		
		window.addEventListener('resize', throttled);
		this.check();
	}

	check() {
		let width = window.innerWidth;

		for (let callback of this.__rawListeners)
			callback(width);
		
		for (let boundary of this.boundaries) {
			if (width > boundary.px)
				continue;
			if (this.type !== boundary.name) {

				this.type = boundary.name;
				this.onChange();
			}

			break;
		}
	}

	onChange() {
		for (let callback of this.__listeners)
			callback(this.type);
	}

	bind(callback) {
		this.listen(callback)

		callback(this.type);
	}

	listen(callback, everyChange) {
		if (typeof callback !== 'function')
			throw 'Incorrect callback type';
		
		if (this.__listeners.indexOf(callback) !== -1
			|| this.__rawListeners.indexOf(callback) !== -1) 
			throw 'callback have been already binded';
			
		if (everyChange) {
			this.__rawListeners.push(callback);
			return;
		}
		
		this.__listeners.push(callback);
	}

	detach(callback) {
		let index = this.__listeners.indexOf(callback);
		if (index !== -1) {
			this.__listeners.splice(index, 1);
			return true;
		}

		index = this.__rawListeners.indexOf(callback);
		if (index !== -1) {
			this.__rawListeners.splice(index, 1);
			return true;
		}

		return false;
	}
}

window.Resolution = new Resolution;

export default window.Resolution;