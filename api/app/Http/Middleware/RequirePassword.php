<?php

namespace App\Http\Middleware;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Closure;

class RequirePassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!!!auth()->check())
            abort(422, 'asd');

        $confirmation = $request->input('password');
        if ($confirmation === null)
        {
            throw ValidationException::withMessages([
                'password' => 'Require password'
            ]);
        }

        $user = auth()->user();
        if (!!!Hash::check($confirmation, $user->password))
        {
            throw ValidationException::withMessages([
                'password' => 'Icorrect password'
            ]);
        }
        
        return $next($request);
    }
}
