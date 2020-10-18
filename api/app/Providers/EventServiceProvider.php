<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\EmailChanged;
use App\Events\PostCreated;
use App\Events\PostDeleted;
use App\Events\PostUpdated;
use App\Listeners\SendEmailVerificationNotification;
use App\Listeners\CreateUpdate;
use App\Listeners\EditUpdate;
use App\Listeners\DeleteUpdate;


class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        
        EmailChanged::class => [
            SendEmailVerificationNotification::class,
        ],

        PostCreated::class => [
            CreateUpdate::class
        ],

        PostDeleted::class => [
            DeleteUpdate::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
