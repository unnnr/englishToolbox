<?php

namespace App\Services\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;

trait HandleTags 
{
    private function attachTags(Model $post, $tags)
    {
        // REQUIRE VALIDATION

        $post->tags()->wherePivot('main', null)->detach();

        $post->tags()->attach($tags);
    }


    private function attachMainTag(Model $post, ?int $newTagID)
    {
        /*
            if previous  equals to new tag
            (Cause of models login previous cant be null)
                -> we must return

            if new tag is not null 
                -> we must try to find it in table  

                -> if this try is failed 
                    -> we must return

                -> OR founded tag is default
                    -> we must return 

            if prvevious is not defautl 
                -> we must detach it

            if new tag is not null 
              (And rely on previous cnecks if  it
              isnt null it has correct format)
                -> we must attach it
                    
        */

        $previous = $post->mainTag();

        if ($previous->id === $newTagID)
            return;

        if (!!!is_null($newTagID))
            $tag = Tag::find($newTagID);

        if (!!!is_null($newTagID) && ( is_null($tag) || $tag->default ))
            return;

        if (!!!$previous->default)  
            $post->tags()->detach($previous->id);

        if (!!!is_null($newTagID))
            $post->tags()->attach($newTagID, ['main' => true]);
    }

    function updateTags(Model $post, Request $request)
    {
        if ($request->has('mainTag'))
        {
            $mainTag  =  $request->input('mainTag');

            $this->attachMaintag($post, $mainTag);
        }
    
        if ($request->has('tags'))
        {
            $tags = $request->input('tags');
            
            $this->attachTags($post, $tags);
        }
    }
}