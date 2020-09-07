<?php

namespace App\Services\Posts;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use App\Services\Traits\HandleTags;

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

    public function create(Request $request) 
    {
        $data = null;

        if (method_exists(get_called_class(), 'beforeCreate'))
            $data = $this->beforeCreate($request);
        
        if (!!!$data)
            $data = $request->validated();

        $post = $this->model::create($data);

        $this->updateTags($post, $request);

        return $this->createScalarResponce($post);
    }

    public function update(Request $request, int $id)
    {
        $data = null;

        $post =  $this->model::findOrFail($id);

        if (method_exists(get_called_class(), 'beforeUpdate'))
            $data = $this->beforeUpdate($request, $post);

        if (!!!$data)
            $data = $request->validated();

        $post->fill($data);
        $post->save();

        $this->updateTags($post, $request);

        return $this->createScalarResponce($post);
    }

    public function delete(int $id)
    {
        $post = $this->model::findOrFail($id);

        if (method_exists(get_called_class(), 'beforeDelete'))
            $data = $this->beforeEdit($request,  $post);
  
        $post->tags()->detach();
        
        $post->delete();

        return;
    }

    public function get($id)
    {
        if (method_exists(get_called_class(), 'beforeGet'))
            $this->beforeGet($request);

        $post = $this->model::findOrFail($id);

        return new $this->resource($post);
    }

    public function all()
    {
        if (method_exists(get_called_class(), 'beforeAll'))
            $this->beforeEdit($request);

        return $this->createCollectionResponce($this->model::all());
    }
}