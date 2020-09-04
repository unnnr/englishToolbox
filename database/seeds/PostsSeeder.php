<?php

use Illuminate\Database\Seeder;
use App\Models\Video;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Video::create([
            'title' =>  'ЛЕКЦИЯ БОРИСА СЕРГЕЕВИЧА БОЯРШИНОВА ПРО ЯКУДЗА И ЯПОНСКУЮ ФИЛОСОФИИ',
            'videoId' => 'sYrkatUgiaM'
        ]);
    }
}
