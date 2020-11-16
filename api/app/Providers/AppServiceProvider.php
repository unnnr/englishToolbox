<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\{
    Auth\VerificationService,
    Auth\UserService,
    Posts\AudioService,
    Posts\VideoService,
    FavoriteService,
    CommentService,
    SchemaService,
    AvatarService,
    BanService,
    TagService,
};

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
        // Posts
        VideoService::class => VideoService::class,
        AudioService::class => AudioService::class,
        SchemaService::class => SchemaService::class,
        
        // Post attachments
        TagService::class => TagService::class,
        CommentService::class => CommentService::class,
        
        // User services
        BanService::class => BanService::class,
        UserService::class => UserService::class,
        AvatarService::class => AvatarService::class,
        FavoriteService::class=>FavoriteService::class,
        VerificationService::class => VerificationService::class,
    ];
}