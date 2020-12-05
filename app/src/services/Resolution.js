import { throttle } from 'throttle-debounce';

class Resolution {
	
	__type = null;

	__listeners = [];

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
}

window.Resolution = new Resolution;

export default window.Resolution;