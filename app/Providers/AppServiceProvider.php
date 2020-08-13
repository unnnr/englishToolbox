<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\SchemaService;
use App\Services\AudioService;
use App\Services\TagService;


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
        VideoService::class => VideoService::class,
        YoutubeService::class => YoutubeService::class,
        TagService::class => TagService::class
    ];
}