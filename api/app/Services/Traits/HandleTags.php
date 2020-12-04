<?php

namespace App\Services\Traits;

use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Models\Tag;

trait HandleTags 
{
    private function attachTags(Model $post, $tags) : void
    {
        if ($tags !== null) {
            foreach (Tag::find($tags) as $tag)
            {
                if (!!!$tag->default)  
                    continue;

                throw ValidationException::withMessages([
                    'tags' => ["Cant attach default '{$tag->label}' tag with id {$tag->id}"]
                ]); 
            }
        }

        $post->tags()->wherePivot('main', null)->detach();

        $post->tags()->attach($tags);
    }

    private function findDefaultTag(Model $post)
    {
        $mainTag = Tag::where([
            'label' => $post::DEFAULT_TAG,
            'default' => true
        ])->firstOrFail();

        return $mainTag;
    }


    private function attachMainTag(Model $post, ?int $tagId) : void
    { 
        if ($tagId === null)
            $mainTag = $this->findDefaultTag($post);
        else {
            $mainTag = Tag::findOrFail($tagId);

            if ($mainTag->default) {
                throw ValidationException::withMessages([
                    'mainTag' => ['Trying to attach incorrect default tag']
                ]); 
            }
        }

        $post->tags()->attach($mainTag, [ 'main' => true ]);
    }


    private function updateMainTag(Model $post, ?int $newTagID)
    {
        $previous = $post->mainTag;
      
        if ($previous->id === $newTagID)
            return;

        $post->tags()->detach($previous);

        $this->attachMainTag($post, $newTagID);
    }

    private function createTags(Model $post, Request $request) 
    {
        $this->attachMainTag($post, $request->input('mainTag'));

        $this->attachTags($post, $request->input('tags'));
    }

    private function updateTags(Model $post, Request $request)
    {
        if ($request->has('mainTag'))
        {
            $mainTag = $request->input('mainTag');

            $this->updateMainTag($post, $mainTag);
        }
    
        if ($request->has('tags'))
        {
            $tags = $request->input('tags');
            
            $this->attachTags($post, $tags);
        }
    }
}