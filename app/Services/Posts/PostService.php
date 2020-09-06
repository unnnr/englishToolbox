<?php

namespace App\Services\Posts;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

abstract class PostService
{  
    private function createScalarResponce($data)
    {
        return new $this->resource($data);
    }

    private function createCollectionResponce(iterable $data)
    {
        return $this->resource::collection($data);
    }

    private function attachTags(Model $post, Request $request)
    {
        $tags = $request->input('tags'); 
        $post->tags()->attach($tags);

        return $tags;
    }

    private function attachMainTag(Model $post, Request $request)
    {
        
        if (!!!$request->has('mainTag'))
            return;

        $mainTag = $request->input('mainTag');
            
        $post->tags()->attach($mainTag, ['main' => true]);
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

        $element = $this->model::create($data);

        $this->attachTags($element, $request);
        $this->attachMainTag($element, $request);

        return $this->createScalarResponce($element);
    }

    public function update(Request $request, int $id)
    {
        $data = null;

        $element =  $this->model::findOrFail($id);

        if (method_exists(get_called_class(), 'beforeUpdate'))
            $data = $this->beforeUpdate($request, $element);

        if (!!!$data)
            $data = $request->validated();

        $element->fill($data);
        $element->save();

        $mainTag = $request->input('mainTag');
        if ($request->has('mainTag') && $mainTag != $element->mainTag()->id)
        { 
            $previous = $element->mainTag();
            if ($previous->default != true)
                $element->tags()->detach($previous->id);
            $this->attachMainTag($element, $request);
        }
    
        if ($request->has('tags'))
        {
            $element->tags()->wherePivot('main', null)->detach();
            
            $this->attachTags($element, $request);
        }

        return $this->createScalarResponce($element);
    }

    public function delete(int $id)
    {
        if (method_exists(get_called_class(), 'beforeDelete'))
            $data = $this->beforeEdit($request);

        $element = $this->model::findOrFail($id);
        
        $element->tags()->detach();
        
        $element->delete();

        return;
    }

    public function get($id)
    {
        if (method_exists(get_called_class(), 'beforeGet'))
            $this->beforeGet($request);

        $element = $this->model::findOrFail($id);

        return new $this->resource($element);
    }

    public function all()
    {
        if (method_exists(get_called_class(), 'beforeAll'))
            $this->beforeEdit($request);

        return $this->createCollectionResponce($this->model::all());
    }
}