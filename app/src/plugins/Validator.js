const Validator = new function()
{
    this.email = function (target)
    {
        const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!!!regex.test(target))
            return new Response(false, `Email is incorrect`);

        return new Response(true);
    }

    this.passowrd = function ()
    {
        
    }

    this.name = function ()
    {

    }
    

    function Response(passed, message = null)
    {
        this.passed = passed;
        this.failed = !!!passed;
        
        this.message = message;
    }

    let regexes = {
        email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        isAlphanum: /[:alnum:]+/u,
    }
}();


const Config = new function()
{
    this.name = {
        max: 32,
        min: 3
    }

    this.password = {
        max: 32,
        min: 5
    }
}();

const ValidationController = new function()
{
    function setCheckFunction(name, target)
    {
        let check = Validator[name];
        if (!!!check)
            return;

        return function()
        {
            return check(target.el.value)
        }
    }

    function setType()
    {

    }

    function updateOptions(target, option)
    {
        let value = option.value;

        switch(option.name)
        {
            case 'failed' :
                target.onfailed = value;
                break;
            
            case 'passed' :
                target.onpassed = value;
                break;

            case 'type' :
                target.check = setCheckFunction(value, target);
                break;
        }
    }


    function createTarget(el, option)
    {
        if (el.tagName !== 'INPUT')
            return;

        let target = { el };

        targets.push(target);
        updateOptions(target, option);

        el.addEventListener('blur', () => {
            if (!!!target.check)
                return;

            let response = target.check();

            if (!!!response)
                return;

            if (response.passed && target.onpassed)
                target.onpassed();

            if (response.failed && target.onfailed)
                target.onfailed(response.message);
        })
    }

    this.attach = (el, option) =>
    {
        for (const target of targets)
        {
            if (target.el === el)
            {
                updateOptions(target, option);
                return;
            }
        }

        createTarget(el, option);
    }       

    let targets = [];
}();


export default {
    install: function(Vue) {
       
        Vue.directive('rule', {
            bind(el, binding) {
                let option = {
                    name: binding.arg,
                    value: binding.value
                }

                ValidationController.attach(el, option);
            }
        });
    }
}