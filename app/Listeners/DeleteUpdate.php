<?php

namespace App\Listeners;

use App\Events\PostDeleted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DeleteUpdate
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
     * @param  PostDeleted  $event
     * @return void
     */
    public function handle(PostDeleted $event)
    {
        $service = app(UpdateSerice::class);
        
        $service->delete($event->post);
    }
}
