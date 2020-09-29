import ContextMenuComponent from '@components/ContextMenu';

const Context = new function ()
{
    function onRightClick(event, items, vnode, el) {

        menu.marginTop = event.pageY;
        menu.marginLeft = event.pageX;

        menu.target = el;
        menu.items = items;
        menu.show();
    }

    function wrappMethod(target, items, vnode, el) {

        return function(event) {

            if (!!!menu)
                throw Error('Any context components hasnt been created');

            event.preventDefault();
            event.stopPropagation();

            
            target(event, items, vnode, el);            
        };
    }   

    this.setMenu = (vm) =>
    {
        if (menu)
            menu.hide();

        menu = vm;
    }

    this.bind = (el, binding, vnode) =>
    {
        if (binding.arg != 'items')
            return;

        let listener = {
            target: el,
            items: binding.value
        };

        el.addEventListener('contextmenu',
            wrappMethod(onRightClick, listener.items, vnode, el));

        listenrs.push(listener);
    }

    let listenrs = [];
    let menu;
}();

export default {
    install: function (Vue)
    {
        Vue.component('context-menu', ContextMenuComponent);

        Vue.directive('context', {bind: Context.bind});

        document.addEventListener('context:mouted', 
            (event) => Context.setMenu(event.detail), true);
    }
}