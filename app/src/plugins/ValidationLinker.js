
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
        let component = vnode.componentInstance;
        let form = this.inputBelongsTo(component);

        if (!!!form)
            return;

        console.log(binding);

        for (let key of this.anchors)
        {
            if (this.anchors[key] !== component)
                return;

            delete this.anchors[key]
        }
    }

    // Confirm

    bindComfirm(el, binding, vnode)
    {

        let component = vnode.componentInstance;
        let form = this.inputBelongsTo(component);
        
        if (!!!form)
            return;

        component.target = {
            some: 's'
        }
    }

    bindComfirm(el, binding, vnode)
    {
        let component = vnode.componentInstance;

        component.target = {
            some: 's'
        }
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