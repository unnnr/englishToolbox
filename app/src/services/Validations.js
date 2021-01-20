
export function isName(options)
{
    const {target, min, max} = options;
    
    if (!!!target || typeof target.length !== 'number')
        return new Response(false, `Name is incorrect`);

    if (Number.isInteger(max) && target.length > max)
        return new Response(false, `Name is too long. It must be contain up to ${max} characters`);

    if (Number.isInteger(min) && target.length < min && min > 0)
        return new Response(false, `Name is too short. It must be at least contain ${min} characters`);

    return new Response(true);
}


export function isEmail(options)
{
    const {target} = options;

    if (!!!regexes.email.test(target))
        return new Response(false, `Email is incorrect`);

    return new Response(true);
}

export function isPassword(options)
{
    const {target, min, max} = options;

    if (typeof target !== 'string')
        return new Response(false, `Password is incorrect`);

    if (Number.isInteger(max) && target.length > max)
        return new Response(false, `Passowrd is too long. It must be shorter than ${max + 1}`);

    if (Number.isInteger(min) && target.length < min && min > 0)
        return new Response(false, `Passowrd is too short. It must be longer than ${min - 1}`);

    return new Response(true);
}

export function isConfirmation(options)
{
    const {target, confirmation} = options;

    if (target !== confirmation)
        return new Response(false, `Password and confirmation dont match`);

    return new Response(true);
}

function Response(isCorrect, message = null)
{
    this.passed = isCorrect;
    this.message = message;
}

let regexes = {
    email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
}