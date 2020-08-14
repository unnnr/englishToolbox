<?php

namespace App\Services;

use App\Models\Tag;
use App\Models\Video;
use App\Http\Requests\CreateTags;
use App\Http\Resources\TagResource;
use App\Http\Resources\VideoResource;

class TagService
{

    public function create(CreateTags $request)
    {
        $tags = $request->json()->all();
        $returned = [];

        foreach ($tags as $tag)
        {
            $newTag = Tag::create([
                'label' => $tag['label'],
                'color' => $tag['color']
            ]);

            if ( array_key_exists('returned', $tag) && $tag['returned'])
                $returned[] = $newTag;
        }
        
        return TagResource::collection($returned);
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

    public function update()
    {

    }

    public function delete()
    {

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
