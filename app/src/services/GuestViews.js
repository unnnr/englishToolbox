import Cookies from 'js-cookie'

class GuestViews {
	__views = null;

	__cookieName = 'views';

	__cookieExpires = 30;
	
	constructor() {
		let stored = Cookies.get(this.__cookieName);

		if (!!!stored) {
			stored = [];
			this.setCookie(stored);
		}

		this.__views = stored;
	}

	setCookie(value) {
		return Cookies.set(this.__cookieName, value, {
			expires: this.__cookieExpires
		});
	}

	createKey(type, id) {
		return type[0] + id;
	}

	has(type, id) {
		if (this.__views === null)
			return true;
		
		let key = this.createKey(type, id);
		return this.__views.indexOf(key) !== -1;
	}

	async update(model, id) {
		if (this.has(model.type, id)) 
			return false;

		// await model.get(id);
		
		let key = this.createKey(model.type, id);
		this.__views.push(key);
		this.setCookie(this.__views);

		return true;
	}
}

export default GuestViews;