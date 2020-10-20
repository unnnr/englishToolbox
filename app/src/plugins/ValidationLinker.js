
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

        console.log(form, 'here');
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

        if (form && typeof key === 'string' && key.length > 0)
            form.anchors[key] = component;
    }

    unbindAnchor(el, binding, vnode)
    {
        let form = this.inputBelongsTo(vnode.componentInstance);
        let key = binding.value;

        if (form && form.anchors[key])
            delete form.anchors[key];
    }

    // Confirm

    bindComfirm(el, binding, vnode)
    {
        let component = vnode.componentInstance;
        let form = this.inputBelongsTo(component);
        let key = binding.value;
        
        console.log( key, form.anchors[key]);

        if (!!!form || !!!form.anchors[key])
            return;

        component.target = form.anchors[key];
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