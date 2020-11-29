import AuthenticatedViews from '@services/AuthenticatedViews'
import GuestViews from '@services/GuestViews'
import Auth from '@services/Auth'

class Views {

	__views = null;

	__service = null;

	constructor() {
		Auth.check().then(this.init);
		Auth.onChange(this.init);
	}

	init(authenticated) {
		if (authenticated)
			this.__service = new AuthenticatedViews();
		else
			this.__service = new GuestViews();
	}

	update(model, id) {
		if (this.__service === null) 
			return false;

		return this.__service.update(model, id);
	}
}

window.Views = new Views;

export default window.Views;