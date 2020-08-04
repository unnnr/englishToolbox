<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\SchemaService;
use App\Services\AudioService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
        SchemaService::class => SchemaService::class,
        AudioService::class => AudioService::class,
        VideoService::class => VideoService::class
    ];
}