<?php

namespace App\Services\Posts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use App\Services\Traits\HandleTags;
use App\Events\PostCreated;
use App\Events\PostUpdated;
use App\Events\PostDeleted;


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
        $this->updateTags($post, $request);

        // Attaching thumbnail
        $post->thumbnail()->create([
            'url' => $this->getThumbnailUrl($post)
        ]);

        event(new PostCreated($post));

        return $this->createScalarResponce($post);
    }

    public function get($id) : JsonResource
    {
        if (method_exists(get_called_class(), 'getting'))
            $this->getting($request);

        $post = $this->model::findOrFail($id);

        return new $this->resource($post);
    }

    public function update(Request $request, int $id) : JsonResource
    {
        $post =  $this->model::findOrFail($id);

        if (method_exists(get_called_class(), 'updating'))
            $this->updating($request, $post);
        else
            $post->update($request->validated());

        $this->updateTags($post, $request);

        event(new PostUpdated($post));

        return $this->createScalarResponce($post);
    }

    public function destroy(int $id) : void
    {
        $post = $this->model::findOrFail($id);

        if (method_exists(get_called_class(), 'deleting'))
            $data = $this->deleting($request,  $post);

        $post->tags()->detach();
        
        $post->delete();

        $post->thumbnail()->delete();

        event(new PostDeleted($post));
    }

    public function all()
    {
        return $this->createCollectionResponce($this->model::all());
    }
}