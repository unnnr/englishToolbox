import Auth from '@services/Auth'

class AuthenticatedViews {
	__views = null;

	constructor() {
		this.__views = Auth.user.views;
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
		
		return true;
	}
}