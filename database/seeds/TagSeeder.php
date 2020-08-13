<?php

use Illuminate\Database\Seeder;
use App\Models\Tag;
use App\Models\Video;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tag = Tag::create([
            'lable' => 'asddsa',
            'color' => 'pink' 
        ]);
            
        $video = Video::create([
            'videoID' => 'temp',
            'title' => 'temp',
        ]);

        $video->tags()->save($tag);
    }
}
