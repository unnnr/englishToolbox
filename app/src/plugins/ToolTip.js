import ToolTipComponent from '@components/popups/Tooltip';

const ToolTip = new class {
	listeners = [];

	component = null;
	
	__conmputeCords(event) {
		const OFFSET_TOP = 10;
		const OFFSET_LEFT = 22;
		
		// Computing distance from page
		let el = event.target;
		let left = 0;
		let top = 0;
	
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			left += el.offsetLeft - el.scrollLeft;
			top += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}

		// Computing coords
		el = event.target;
		let x = left + el.offsetWidth / 2 - OFFSET_LEFT;
		let y = top + el.offsetHeight + OFFSET_TOP;

		return [x, y];
	}

	__wrappEvent(listener, callback) {
		return function () {
			return callback(listener, ...arguments);
		}
	}

	showTooltip(listener, event) {
		let component = ToolTip.component; 
		if (!!!component)
			return;

		let [x, y] = ToolTip.__conmputeCords(event);
		component.move(x, y);
		component.label = listener.label;
		component.show();
	}

	hideTooltip() {
		let component = ToolTip.component; 
		if (!!!component)
			return;

		component.hide();
	}

	setComponent(vmodel) {
		if (this.component)
			this.component.hide();	

		this.component = vmodel;	
	}

	bind(el, binding) {
		let listener = {
			el, label: binding.value
		};

		this.listeners.push(listener);

		el.addEventListener('click', 
			this.__wrappEvent(listener, this.showTooltip));

		el.addEventListener('mouseover', 
			this.__wrappEvent(listener, this.showTooltip));

		el.addEventListener('mouseleave', 
			this.__wrappEvent(listener, this.hideTooltip));
	}

	unbind(el) {
		for (let index in this.listeners)
		{
			if (this.listeners[index].el !== el)
				continue;
			
			this.listeners.splice(index, 1);
			return;
		}
	}
}

export default {
	install(Vue) {
		document.addEventListener('tooltip:mounted', 
			(event) => ToolTip.setComponent(event.detail), true);

		Vue.component('tooltip', ToolTipComponent);

		Vue.directive('tooltip', { 
			bind: ToolTip.bind.bind(ToolTip),
			unbind: ToolTip.unbind.bind(ToolTip)
		});
	}
}