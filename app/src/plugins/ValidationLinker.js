
const Linker = new class  
{
    inputBelongsTo(vcomponent) 
    {
        let current = vcomponent;

        while(current = current.$parent)
        {
            if (current.handleValidation)
                return current;

        }

        return null;
    }

    // Input

    async bindInput(el, binding, vnode) 
    {
        let component = vnode.componentInstance;
        let form = this.inputBelongsTo(component);

        if (form)
            form.inputs.push(component);
    }

    unbindInput(el, binding, vnode)
    {
        let component = vnode.componentInstance;
        let form = this.inputBelongsTo(component);
        
        if (!!!form)
            return;

        for (let key in form.inputs)
        {
            if (form.inputs[key] !== component)
                return;
            
            delete form.inputs[key];
        }
    }

    // Anchor

    bindAnchor(el, binding, vnode) 
    {
        let component = vnode.componentInstance;
        let form = this.inputBelongsTo(component);
        let key = binding.value;

        if (!!!form || typeof key !== 'string' || !!!key.length)
            return;

        // Saving anchor
        form.anchors[key] = component;

        // Updating watcher
        if (form.watchers[key])
            form.watchers[key].target = component;
    }

    unbindAnchor(el, binding, vnode)
    {
        let component = vnode.componentInstance;
        let form = this.inputBelongsTo(component);
        let key = binding.value;

        if (!!!form)
            return;

        // Removing anchor
        delete form.anchors[key];
        
        // Updating watcher
        if (form.watchers[key])
            form.watchers[key].target = null;
    }

    // Confirm

    bindComfirm(el, binding, vnode)
    {
        let component = vnode.componentInstance;
        let form = this.inputBelongsTo(component);
        let key = binding.value;
        
        if (!!!form || typeof key !== 'string' || !!!key.length)
            return;

        // Saving confirmation
        form.watchers[key] = component;
    
        // Updating watcher
        let target = form.anchors[key];
        if (target)
            component.target = target;
    }

    unbindConfirm(el, binding, vnode)
    {
        let component = vnode.componentInstance;
        let form = this.inputBelongsTo(component);
        let key = binding.value;
        
        if (!!!form)
            return;

        // Removing confirmation
        delete form.binddings[key];

        // Updating target
        component.target = null;
    }
}();

export default {
    install: function (Vue)
    {
        Vue.directive('validate', {
            inserted: Linker.bindInput.bind(Linker),
            unbind: Linker.unbindInput.bind(Linker)
        });

        Vue.directive('name', {
            inserted: Linker.bindAnchor.bind(Linker),
            unbind: Linker.unbindAnchor.bind(Linker)
        });

        Vue.directive('confirm', {
            inserted: Linker.bindComfirm.bind(Linker),
        });
    }
}