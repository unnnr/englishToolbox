<?php

namespace App\Services\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;

use Illuminate\Support\Facades\Log;

trait HandleTags 
{
    private function attachTags(Model $post, $tags) : void
    {
        // REQUIRE VALIDATION

        $post->tags()->wherePivot('main', null)->detach();

        $post->tags()->attach($tags);
    }

    private function findDefaultTag(Model $post)
    {
        $mainTag = Tag::where([
            'label' => $post->defaultTag,
            'default' => true
        ])->firstOrFail();

        return $mainTag;
    }


    private function attachMainTag(Model $post, ?int $tagId) : void
    { 
        if ($tagId === null)
            $mainTag = $this->findDefaultTag($post);
        else
            $mainTag = Tag::findOrFail($tagId);

        $post->tags()->attach($mainTag, [ 'main' => true ]);
    }


    private function updateMainTag(Model $post, ?int $newTagID)
    {
        $previous = $post->mainTag();
      
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