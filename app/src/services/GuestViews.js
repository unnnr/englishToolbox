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

	has(type, id) {
		if (this.__views === null)
			return true;
		
		let key = type[0] + id;
		return this.views.indexOf(key) !== -1;
	}

	async update(model, id) {
		if (this.has(model.type, id)) 
			return false;

		// await model.get(id);
		
		let key = model.type[0] + id;
		
		Cookies.setCookie(this.__views, )

		return true;
	}
}