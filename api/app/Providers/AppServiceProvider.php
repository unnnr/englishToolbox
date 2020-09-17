<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\SchemaService;
use App\Services\TagService;
use App\Services\Auth\UserService;
use App\Services\Auth\VerificationService;
use App\Services\CommentService;
use App\Services\Posts\AudioService;
use App\Services\Posts\VideoService;


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
        
        CommentService::class => CommentService::class,
        TagService::class => TagService::class,

        UserService::class => UserService::class,
        VerificationService::class => VerificationService::class
    ];
}