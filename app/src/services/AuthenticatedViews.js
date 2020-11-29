import User from '@models/User'

class AuthenticatedViews {
	__views = null;

	constructor() {
		this.load();
	}

	async load() {
		this.__views = await User.views();
	}

	createKey(type, id) {
		return type + id;
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

		await model.get(id, true);

		let key = this.createKey(model.type, id);
		this.__views.push(key);
		
		return true;
	}
}

export default AuthenticatedViews;