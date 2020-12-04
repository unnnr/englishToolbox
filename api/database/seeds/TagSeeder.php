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
        Tag::create([
            'label' => 'paleturquoise',
            'color' => 'paleturquoise' 
        ]);

        Tag::create([
            'label' => 'powderblue',
            'color' => 'powderblue' 
        ]);

        Tag::create([
            'label' => 'plum',
            'color' => 'plum' 
        ]);

        Tag::create([
            'label' => 'bisque',
            'color' => 'bisque' 
        ]);

        Tag::create([
            'label' => 'lightgreen',
            'color' => 'lightgreen' 
        ]);

        Tag::create([
            'label' => 'lightblue',
            'color' => 'lightblue' 
        ]);

        Tag::create([
            'label' => 'video',
            'color' => 'cornflowerblue',
            'default' => true
        ]);

        Tag::create([
            'label' => 'audio',
            'color' => 'plum',
            'default' => true
        ]);

        Tag::create([
            'label' => 'chart',
            'color' => 'cadetblue',
            'default' => true
        ]);
    }
}
