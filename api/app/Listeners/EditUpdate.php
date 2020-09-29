<?php

namespace App\Listeners;

use App\Events\PostUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Services\UpdateService;


class EditUpdate
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
     * @param  PostUpdated  $event
     * @return void
     */
    public function handle(PostUpdated $event)
    {
        return;
        $service = app(UpdateService::class);
        
        $service->update($event->post);
    }
}
