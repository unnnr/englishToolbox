<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\{
    Auth\VerificationService,
    Auth\RecoveryService,
    Auth\UserService,
};

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
        // User services
        UserService::class => UserService::class,
        RecoveryService::class => RecoveryService::class,
        VerificationService::class => VerificationService::class,
    ];
}