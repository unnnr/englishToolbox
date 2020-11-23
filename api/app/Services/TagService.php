<?php

namespace App\Services;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\TagResource;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use App\Models\Tag;


class TagService
{
    public function create(Request $request)
    {
        $newTag = Tag::create(
            $request->validated()
        );

        return new TagResource($newTag);
    }

    public function get($id)
    {
        $tag = Tag::find($tagId);

        return new TagResource($tag);
    }

    public function all()
    {
        $all = Tag::all();

        return TagResource::collection($all);
    }

    public function delete(Tag $tag)
    {
        if ($tag->default) 
        {
            throw ValidationException::withMessages([
                'Cant delete default tag'
            ]);
        }
        
        // Posts MUST have main tags, 
        // so we need to reassign them
        $rawTags = DB::table('taggables')
            ->where(['tag_id' => $tag->id, 'main' => 1])
            ->get();

        foreach ($rawTags as $rawTag)
        {
            $postClass = $rawTag->taggable_type;
            $postId = $rawTag->taggable_id;     
            
            // Retrieving default tag 
            $defaultTag = Tag::where([
                'label' => $postClass::DEFAULT_TAG,
                'default' => 1
            ])->firstOrFail();
            
            // Inserting default tag
            DB::table('taggables')->insert([
                'taggable_type' => $postClass,
                'taggable_id' => $postId,
                'tag_id' => $defaultTag->id,
                'main' => 1,
            ]);
        }
        
        // Removing attachments
        DB::table('taggables')
            ->where('tag_id', $tag->id)
            ->delete();

        // Removing tag
        $tag->delete();
    }

    public function videos(int $tagId)
    {
        $tag = Tag::find($tagId);
        $videos = [];
        
        if ($tag)
            $videos = $tag->videos;
        else 
            abort(422, 'Incorrect tag id');

        return  VideoResource::collection($videos);
    }

    public function videoTags(int $videoId)
    {
        $video = Video::find($videoId);
        $tags = [];

        if ($video)
            $tags = $video->tags;
        else
            abort(422, 'Incorrect video id');

        return TagResource::collection($tags);
    }
}
