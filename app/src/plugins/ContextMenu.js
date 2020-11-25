import ContextMenuComponent from '@components/popup/ContextMenu';

const Context = new function ()
{
    function onRightClick(event, items, vnode, el) {

        menu.top = event.pageY;
        menu.left = event.pageX;

        menu.target = el;
        
        if (typeof items === 'function')
            menu.items = items();
        else 
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
        if (binding.arg != 'items' || !!!binding.value)
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

        document.addEventListener('context:mounted', 
            (event) => Context.setMenu(event.detail), true);
    }
}