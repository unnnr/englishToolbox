<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('whiteboard', function ($user) {
    return (bool) $user;
});

Broadcast::channel('whiteboard-online', function ($user) {
    return [
        'avatar' => $user->avatar->url,
        'admin' => $user->admin, 
        'name' => $user->name,
        'id' => $user->id
    ];
});