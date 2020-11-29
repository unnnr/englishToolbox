<?php

namespace App\Services\Posts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use App\Services\Traits\HandleTags;
use App\Events\PostCreated;
use App\Events\PostUpdated;
use App\Events\PostDeleted;
use App\Models\View;

abstract class PostService
{  
    use HandleTags;
    
    private function createScalarResponce($data)
    {
        return new $this->resource($data);
    }

    private function createCollectionResponce(iterable $data)
    {
        return $this->resource::collection($data);
    }

    public function __construct()
    {
        if (!!!$this->model)
            throw Error('Undefined model');
        
        if (!!!$this->resource)
            throw Error('Undefined resource');
    }

    public function create(Request $request) : JsonResource
    {
        $post = null;

        // Check for custom model creation logic 
        if (method_exists(get_called_class(), 'creating'))
            $post = $this->creating($request);
        
        if (!!!$post)
            $post = $this->model::create($request->validated());

        // Attaching tags and main tag
        $this->createTags($post, $request);

        // Attaching thumbnail
        $post->thumbnail()->create([
            'url' => $this->getThumbnailUrl($post, $request)
        ]);

        event(new PostCreated($post));

        return $this->createScalarResponce($post);
    }

    public function get(Model $post) : JsonResource
    {
        // Updating views
        $authenticated = auth('sanctum')->check();

        if (!!!$authenticated 
            || ($authenticated && auth('sanctum')->user()->hasntViewed($post)))
        {
            $post->update([
                'views' => $post->views + 1
            ]);

            // creating view instance
            //
            //
            //
            Log::debug('views');
        }
        
        // Calling child callback
        if (method_exists(get_called_class(), 'getting'))
            return $this->getting($post);

        return new $this->resource($post);
    }

    public function update(Request $request, Model $post) : JsonResource
    {
        if (method_exists(get_called_class(), 'updating'))
            $this->updating($request, $post);
        else
            $post->update($request->validated());

        $this->updateTags($post, $request);

        event(new PostUpdated($post));

        return $this->createScalarResponce($post);
    }

    public function destroy(Model $post) : void
    {
        if (method_exists(get_called_class(), 'deleting'))
            $data = $this->deleting($post);

        // Removing attachments
        $post->tags()->detach();
        $post->thumbnail()->delete();
        
        // Deleting post 
        $post->delete();

        event(new PostDeleted($post));
    }

    public function all()
    {
        return $this->createCollectionResponce($this->model::all());
    }
}