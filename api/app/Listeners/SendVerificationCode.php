<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Services\Auth\VerificationService;

class SendVerificationCode
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Registered  $event
     * @return void
     */
    public function handle($event)
    {
        $user = $event->user;

        $service = app(VerificationService::class);
        $service->createCode($user);
        
        $user->sendEmailVerificationNotification();
    }
}