<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\SchemaService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
        SchemaService::class => SchemaService::class
    ];
}
